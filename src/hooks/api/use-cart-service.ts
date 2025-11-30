import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItemRequest } from "@/models/requests";
import { cartService } from "@/services";


export const useAddItemToCartMutation = () => {
  return useMutation({
    mutationFn: async (item: CartItemRequest) => {
      const response = await cartService.addItemToCart(item);
      return response.data;
    },
  });
};

export const useUpdateQuantityMutation = () => {
  return useMutation({
    mutationFn: async (item: CartItemRequest) => {
      const response = await cartService.updateItemQuantity(item);
      return response.data;
    },
  });
};