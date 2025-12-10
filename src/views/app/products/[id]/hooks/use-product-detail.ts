import { useRouter } from "next/navigation";

import { useGetProductDetail } from "@/hooks/api";

export const useProductDetail = (id: string) => {
  // State
  const router = useRouter();

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductDetail(id);

  // Computed values
  const productDetail = queryData?.data;

  // Actions
  const handleGoToProducts = () => {
    router.push("/products");
  };

  const handleRetry = () => {
    refetch();
  };

const handleCalculateDiscountedPrice = (price: string, discount: number) => {
    const cleanPrice = price.replace(/[^0-9]/g, ""); 
    const numericPrice = parseFloat(cleanPrice);
    const finalPrice = numericPrice * (1 - discount);
    return finalPrice.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return {
    // Data
    productDetail,
    isLoading,
    error,

    // Actions
    actions: {
      handleGoToProducts,
      handleRetry,
      handleCalculateDiscountedPrice,
    },
  };
};
