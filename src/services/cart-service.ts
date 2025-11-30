import { ApiResponse } from "@/models/generics";
import { CartItemRequest } from "@/models/requests";
import { GetCartResponse } from "@/models/responses";
import { BaseApiService } from "./base-api-service";

export class CartService extends BaseApiService {
  constructor() {
    super("/cart");
  }

  addItemToCart(item: CartItemRequest) {
    return this.httpClient.post<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/items`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  updateItemQuantity(item: CartItemRequest) {
    return this.httpClient.patch<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/items`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
}

export const cartService = new CartService();