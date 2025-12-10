import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

// OJO: No importamos notFound ni AxiosError para no tentarnos a usarlos.
import { isValidId } from "@/lib";
import { productService } from "@/services";
import { ProductDetailView } from "@/views";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  // 1. Metadata segura: Si falla, devolvemos títulos genéricos en lugar de romper la página.
  try {
    if (!isValidId(id)) throw new Error("ID Inválido");

    const response = await productService.getProductDetail(id);
    const productDetail = response.data.data;

    if (!productDetail) throw new Error("No encontrado");

    return {
      title: `${productDetail.brandName} ${productDetail.title} | Tienda UCN`,
      description: productDetail.description,
    };
  } catch (error) {
    return {
      title: "Detalle del Producto | Tienda UCN",
      description: "Revisa los detalles de este producto.",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const queryKey = ["products", "detail", id];

  // 2. Pre-fetching Seguro
  if (isValidId(id)) {
    try {
      await queryClient.fetchQuery({
        queryKey,
        queryFn: async () => {
          const response = await productService.getProductDetail(id);
          return response.data;
        },
      });
    } catch (error) {
      // 3. ¡EL TRUCO MAESTRO!
      // Si falló en el servidor (404, 500, etc.), BORRAMOS ese error del caché.
      // ¿Por qué? Porque el error de Axios no se puede enviar al cliente (rompe la app).
      // Al borrarlo, enviamos un estado "limpio".
      // Cuando el navegador reciba esto, verá que no hay datos y hará su propia petición.
      // Esa petición del navegador fallará igual, PERO activará tu componente <ProductErrorState>
      // en lugar de la pantalla blanca de la muerte.
      queryClient.removeQueries({ queryKey });
    }
  }

  // 4. Renderizamos siempre la vista, pase lo que pase.
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailView id={id} />
    </HydrationBoundary>
  );
}