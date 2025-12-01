import CartView from "@/views/app/cart";

export const metadata = {
    title: 'tu carrito de compras',
    descrption: "Revisa el detalle de tu carrito de compras"

}

export default function CartPage() {
  return (
    <div>
      <CartView />
    </div>
  );
}