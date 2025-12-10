import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/models/generics";
import {
  ChangePasswordRequest,
  UpdateProfileRequest,
  UpdateUserEmailRequest
} from "@/models/requests";
import { UserProfileResponse } from "@/models/responses";
import { BaseApiService } from "./base-api-service";

export class UserService extends BaseApiService {
  constructor() {
    super("/user");
  }

  getUserProfile() {
    return this.httpClient.get<ApiResponse<UserProfileResponse>>(
      `${this.baseURL}/profile`
    );
  }

  updateUserProfile(data: UpdateProfileRequest) {
    return this.httpClient.put<ApiResponse<string>>(
      `${this.baseURL}/profile`,
      data
    );
  }

  UserEmail(data: UpdateUserEmailRequest) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}/update-email`,
      data
    );
  }

  changePassword(data: ChangePasswordRequest) {
    return this.httpClient.patch<ApiResponse<string>>(
      `${this.baseURL}/change-password`,
      data
    );
  }
}

export const userService = new UserService();