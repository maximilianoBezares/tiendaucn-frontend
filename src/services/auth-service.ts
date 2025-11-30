import { ApiResponse } from "@/models/generics";
import {
  LoginRequest,
} from "@/models/requests";

import { BaseApiService } from "./base-api-service";

export class AuthService extends BaseApiService {
  constructor() {
    super("/auth");
  }

  login(loginData: LoginRequest) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}/login`,
      loginData
    );
  }
}

export const authService = new AuthService();