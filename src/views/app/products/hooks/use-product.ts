import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MouseEvent } from "react";

import { useGetProductsForCustomer } from "@/hooks/api";
import { PaginationQueryParams } from "@/models/requests";

export const useProducts = () => {
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

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductsForCustomer(filters);

  // Computed values
  const productsData = queryData?.data;
  const products = productsData?.products ?? [];
  const totalPages = productsData?.totalPages ?? 0;
  const totalCount = productsData?.totalCount ?? 0;
  const currentPage = productsData?.currentPage ?? 1;

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

  // Actions
    const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleGoToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("searchTerm", term);
    } else {
      params.delete("searchTerm");
    }
    params.set("pageNumber", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangePageSize = (size: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", size.toString());
    params.set("pageNumber", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleRedirectToProductDetail = (productId: number) => {
    router.push(`/products/${productId}`);
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

    // Loading and error states
    isLoading,
    error,

    // Filter state
    filters,

    // Actions
    actions: {
      handleSearch,
      handleChangePageSize,
      handleRedirectToProductDetail,
      handlePreviousPage,
      handleNextPage,
      handlePageClick,
      handleRetry,
    },
  };
};