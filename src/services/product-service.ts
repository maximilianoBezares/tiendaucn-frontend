import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/models/generics";
import { PaginationQueryParams } from "@/models/requests";
import {
  ProductListForCustomerResponse,
} from "@/models/responses";
import { BaseApiService } from "./base-api-service";

export class ProductService extends BaseApiService {
  constructor() {
    super("/product");
  }

  getProductsForCustomer(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<ProductListForCustomerResponse>>(
      `${this.baseURL}/customer/products`,
      { params } as AxiosRequestConfig
    );
  }
}

export const productService = new ProductService();