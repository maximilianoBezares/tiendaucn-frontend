import { GetCartResponse } from "@/models/responses";
import { BaseApiService } from "./base-api-service";
import { ApiResponse } from "@/models/generics";
import { CartRequest } from "@/models/requests";

export class CartService extends BaseApiService { 

    constructor() {
        super('/cart');
    }

    getCart() {
        return this.httpClient.get<ApiResponse<GetCartResponse>>(`${this.baseURL}`);
    }

    addItemToCart(cartData: CartRequest){
        return this.httpClient.post<ApiResponse<GetCartResponse>>(`${this.baseURL}/items`, cartData);
    }


}