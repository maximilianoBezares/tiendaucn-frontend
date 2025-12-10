"use client";

import { User } from "lucide-react";
import {
  ProfileForm,
  ChangePasswordForm,
  ProfileSkeleton,
} from "./components";
import { useProfileView } from "./hooks";

export default function ProfileView() {
  const { profile, isLoading, isUpdating, actions } = useProfileView();

  if (isLoading || !profile) {
    return <ProfileSkeleton />;
  }

  const formattedBirthDate = profile.birthDate
    ? new Date(profile.birthDate).toISOString().split("T")[0]
    : "";

  const defaultValues = {
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    rut: profile.rut || "",
    phoneNumber: profile.phoneNumber || "",
    birthDate: formattedBirthDate,
    gender: profile.gender || "O",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header de la sección */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-full">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Administra tu información personal y seguridad
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm
            defaultValues={defaultValues}
            isUpdating={isUpdating}
            onSubmit={(values) => {
              actions.handleUpdateProfile({
                ...profile,
                ...values,
                verificationCode: "",
              });
            }}
          />
        </div>

        <div className="space-y-6">
          <ChangePasswordForm
            onSubmit={actions.handleChangePassword}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}