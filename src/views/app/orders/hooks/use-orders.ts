import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";
import { toast } from "sonner";

import { useGetOrdersList } from "@/hooks/api";
import { useOrderPDF } from "@/hooks/common";
import { handleApiError } from "@/lib";
import { PaginationQueryParams } from "@/models/requests";

export const useOrders = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchTerm = searchParams.get("searchTerm") || "";
  const filters: PaginationQueryParams = {
    pageNumber,
    pageSize,
    searchTerm,
  };

  // PDF Generator
  const { generateOrderPDF } = useOrderPDF();

  // API calls
  const {
    data: queryData,
    isLoading,
    error: apiError,
    refetch,
  } = useGetOrdersList(filters);

  // Computed values
  const ordersData = queryData?.data;
  const orders = ordersData?.orders ?? [];
  const totalPages = ordersData?.totalPages ?? 0;
  const totalCount = ordersData?.totalCount ?? 0;
  const currentPage = ordersData?.currentPage ?? pageNumber;

  // Manejo de Error para "Empty State"
  const obtainErrorDetails = () => {
    if (!apiError) return null;
    const handledError = handleApiError(apiError);

    // Ocultar error si es solo que no hay resultados
    if (
      handledError.details?.includes("No se encontraron coincidencias") ||
      handledError.message === "Producto no encontrado" ||
      handledError.message?.includes("Argumento fuera de rango") ||
      handledError.message?.includes("out of the range")
    ) {
      return null;
    }
    return handledError;
  };

  const currentError = obtainErrorDetails();

  // Helpers de Paginación
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 3) {
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = totalPages > 1 ? generatePageNumbers() : [];

  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleGoToPage = (page: number) => {
    updateUrlParams({ pageNumber: page.toString() });
  };

  const handleSearch = (term: string) => {
    updateUrlParams({
      searchTerm: term,
      pageNumber: "1", 
    });
  };

  const handleChangePageSize = (size: number) => {
    updateUrlParams({
      pageSize: size.toString(),
      pageNumber: "1",
    });
  };

  const handleViewOrderDetail = (orderId: string) => {
    router.push(`/orders/order/${orderId}`);
  };

  const handleDownloadPDF = async (orderCode: string) => {
    try {
      const order = orders.find(o => o.code === orderCode);
      if (!order) {
        toast.error("No se encontró la orden");
        return;
      }
      await generateOrderPDF(order);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage || "Error al descargar el PDF");
    }
  };

  const handlePreviousPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) handleGoToPage(currentPage - 1);
  };

  const handleNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) handleGoToPage(currentPage + 1);
  };

  const handlePageClick = (e: MouseEvent<HTMLAnchorElement>, pageNum: number) => {
    e.preventDefault();
    handleGoToPage(pageNum);
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    // Data
    orders,
    hasOrders: currentError ? false : orders.length > 0,
    pagination: {
      totalPages,
      totalCount,
      currentPage,
      pageNumbers,
    },

    // Status
    isLoading,
    error: currentError,

    // Filters
    filters,

    // Actions
    actions: {
      handleSearch,
      handleChangePageSize,
      handleViewOrderDetail,
      handleDownloadPDF,
      handlePreviousPage,
      handleNextPage,
      handlePageClick,
      handleRetry,
    },
  };
};