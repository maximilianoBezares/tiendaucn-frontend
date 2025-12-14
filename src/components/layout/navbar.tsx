"use client";

import {
  ChevronDownIcon,
  EditIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useLogoutMutation } from "@/hooks/api";
import { CartDropdown } from "./cart-dropdown";

export const Navbar = () => {
  const { mutateAsync: logoutAsync, isPending: isLoggingOut } =
    useLogoutMutation();
  const { status, data } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const role = data?.user.role;
  const isAdmin = role?.toLowerCase() === "admin";

  const handleLogout = async () => {
    await logoutAsync();
  };

  return (
    <header className="bg-blue-800 text-white h-16">
      <nav className="max-w-7xl mx-auto flex items-center px-4 h-full">
        <Link href="/" className="font-bold text-2xl cursor-pointer">
          IDWM
        </Link>

        {/* Mobile actions */}
        <div className="flex items-center ml-auto lg:hidden space-x-2">
          <CartDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/">Inicio</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/products">Productos</Link>
              </DropdownMenuItem>

              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/products">Admin · Productos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users">Admin · Usuarios</Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />

              {isLoading ? null : isAuthenticated ? (
                <>
                  {!isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Mis órdenes</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-600"
                  >
                    {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">Iniciar sesión</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">Registrarse</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 justify-between items-center ml-8">
          <ul className="flex space-x-8 font-medium items-center">
            <li>
              <Link href="/" className="hover:text-gray-200">
                Inicio
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-gray-200">
                Productos
              </Link>
            </li>

            {isAdmin && (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center hover:text-gray-200">
                      Administración
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/products"
                        className="flex items-center"
                      >
                        <PackageIcon className="h-4 w-4 mr-2" />
                        Productos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/users" className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2" />
                        Usuarios
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>

          <ul className="flex space-x-4 font-medium items-center">
            <li>
              <CartDropdown />
            </li>

            {isLoading ? null : isAuthenticated ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-center bg-blue-600 hover:bg-blue-700 rounded-full px-4">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Mi cuenta
                      <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {!isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center">
                          <PackageIcon className="h-4 w-4 mr-2" />
                          Mis órdenes
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="#" className="flex items-center">
                        <EditIcon className="h-4 w-4 mr-2" />
                        Editar perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="text-red-600"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="hover:text-gray-200 px-4 py-2"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
