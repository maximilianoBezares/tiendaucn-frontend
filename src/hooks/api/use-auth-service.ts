import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { authService } from "@/services";
import {
  LoginRequest,
} from "@/models/requests";
import { handleApiError } from "@/lib";
import { queryClient } from "@/providers";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await authService.login({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        const result = await signIn("credentials", {
          email: data.email,
          token: response.data.data,
          redirect: false,
        });

        if (!result?.ok) {
          throw new Error("Error al crear la sesión");
        }

        return result;
      } catch (error) {
        const apiError = handleApiError(error);
        throw new Error(apiError.details);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.replace("/products");
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
      queryClient.clear();
    },
    onSuccess: () => {
      toast.success("Sesión cerrada correctamente");
      router.refresh();
    },
  });
};