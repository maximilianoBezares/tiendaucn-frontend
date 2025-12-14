import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

import {
  useGetProductsForAdmin,
  useToggleProductAvailabilityMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib";
import { PaginationQueryParams } from "@/models/requests";

export const useAdminProducts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener valores iniciales de la URL
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchTerm = searchParams.get("searchTerm") || "";

  // Construir objeto de filtros basado en URL
  const filters: PaginationQueryParams = {
    pageNumber,
    pageSize,
    searchTerm,
  };

  // State local solo para UI (loading de toggle)
  const [toggledProductId, setToggledProductId] = useState<string | null>(null);

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductsForAdmin(filters);

  const { mutateAsync: toggleProductAvailability, isPending: isToggling } =
    useToggleProductAvailabilityMutation();

  // Computed values
  const productsData = queryData?.data;
  const products = productsData?.products ?? [];
  const totalPages = productsData?.totalPages ?? 0;
  const totalCount = productsData?.totalCount ?? 0;
  const currentPage = productsData?.currentPage ?? pageNumber;

  // Helpers
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = totalPages > 1 ? generatePageNumbers() : [];

  // Actions - Actualización de URL
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

  const handleToggleProductAvailability = async (productId: string) => {
    try {
      setToggledProductId(productId);
      await toggleProductAvailability(productId);
      await refetch();
      toast.success("Producto actualizado exitosamente");
    } catch (error) {
      const apiError = handleApiError(error).details;
      toast.error(apiError);
    }
  };

  const handlePreviousPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      handleGoToPage(currentPage - 1);
    }
  };

  const handleNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      handleGoToPage(currentPage + 1);
    }
  };

  const handlePageClick = (
    e: MouseEvent<HTMLAnchorElement>,
    pageNum: number
  ) => {
    e.preventDefault();
    handleGoToPage(pageNum);
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    // Product data
    products,
    pagination: {
      totalPages,
      totalCount,
      currentPage,
      pageNumbers,
    },
    toggledProductId,

    // Loading and error states
    isLoading,
    error,
    isToggling,

    // Filter state
    filters,

    // Actions
    actions: {
      handleSearch,
      handleChangePageSize,
      handleToggleProductAvailability,
      handlePreviousPage,
      handleNextPage,
      handlePageClick,
      handleRetry,
    },
  };
};