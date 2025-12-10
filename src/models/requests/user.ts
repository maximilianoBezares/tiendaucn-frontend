export interface UpdateProfileRequest {
  verificationCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  rut: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateUserEmailRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}