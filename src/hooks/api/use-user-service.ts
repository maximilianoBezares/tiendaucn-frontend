import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChangePasswordRequest,
  UpdateProfileRequest,
  UpdateUserEmailRequest,
} from "@/models/requests";
import { userService } from "@/services";


export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await userService.getUserProfile();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await userService.updateUserProfile(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};

export const useUpdateEmailMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserEmailRequest) => {
      const response = await userService.UserEmail(data);
      return response.data;
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await userService.changePassword(data);
      return response.data;
    },
  });
};