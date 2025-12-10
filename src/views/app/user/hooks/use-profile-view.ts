import { useState } from "react";
import { toast } from "sonner";

import {
  useChangePasswordMutation,
  useGetUserProfile,
  useUpdateEmailMutation,
  useUpdateProfileMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib"; // Tu utilidad de errores
import {
  ChangePasswordRequest,
  UpdateProfileRequest,
  UpdateUserEmailRequest,
} from "@/models/requests";

export const useProfileView = () => {
  const {
    data: profileData,
    isLoading: isFetchingProfile,
    refetch: refetchProfile,
    error: profileError,
  } = useGetUserProfile();
  const updateProfileMutation = useUpdateProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const updateEmailMutation = useUpdateEmailMutation();
  const profile = profileData?.data;
  const isUpdating =
    updateProfileMutation.isPending ||
    changePasswordMutation.isPending ||
    updateEmailMutation.isPending;
  const isLoading = isFetchingProfile || isUpdating;
  const handleUpdateProfile = async (values: UpdateProfileRequest) => {
    try {
      await updateProfileMutation.mutateAsync(values);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(message || "Error al actualizar el perfil");
    }
  };

  const handleChangePassword = async (values: ChangePasswordRequest) => {
    try {
      await changePasswordMutation.mutateAsync(values);
      toast.success("Contraseña actualizada correctamente");
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(message || "Error al cambiar la contraseña");
    }
  };

  const handleUpdateEmail = async (values: UpdateUserEmailRequest) => {
    try {
      await updateEmailMutation.mutateAsync(values);
      toast.success(
        "Código de verificación enviado. Revisa tu nuevo correo."
      );
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(message || "Error al solicitar cambio de correo");
    }
  };

  return {
    // Data
    profile,

    // States
    isLoading,
    isFetchingProfile,
    isUpdating,
    error: profileError,

    // Actions
    actions: {
      handleUpdateProfile,
      handleChangePassword,
      handleUpdateEmail,
      refetchProfile,
    },
  };
};