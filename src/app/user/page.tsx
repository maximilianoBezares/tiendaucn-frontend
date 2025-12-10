import { Metadata } from "next";
import { ProfileView } from "@/views";

export const metadata: Metadata = {
  title: "Mi Perfil | Tienda UCN",
  description: "Gestiona tu información personal y la seguridad de tu cuenta.",
};

export default function ProfilePage() {
  return <ProfileView />;
}