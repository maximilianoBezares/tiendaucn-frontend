import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  rut: z.string().min(8, "RUT inválido"), 
  phoneNumber: z.string().min(8, "Número de teléfono inválido"),
  gender: z.string().optional(),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de nacimiento inválida",
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirmNewPassword: z.string().min(1, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

export const updateEmailSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});