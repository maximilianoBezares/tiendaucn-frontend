export {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useVerifyEmailMutation,
    useResendCodeMutation
 } from "./use-auth-service"
export {
    useGetProductsForCustomer,
    useGetProductDetail,
    useCreateProductMutation,
    useGetProductsForAdmin,
    useToggleProductAvailabilityMutation
} from "./use-product-service"
export {
    useAddItemToCartMutation,
    useUpdateQuantityMutation,
    useRemoveItemFromCartMutation,
    useClearCartMutation,
    useGetCart,
    useCheckoutMutation,
} from "./use-cart-service"
export {
  useCreateOrderMutation,
  useGetOrderDetail,
  useGetOrdersList,
} from "./use-order-service";
