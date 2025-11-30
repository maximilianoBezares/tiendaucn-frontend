import { ApiResponse } from "@/models/generics";
import {
  LoginRequest,
  RegisterRequest,
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

  register(registerData: RegisterRequest) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}/register`,
      registerData
    );
  }
}

export const authService = new AuthService();