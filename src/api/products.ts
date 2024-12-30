import type { Product } from "../types";
import { ApiError } from "../utils/errors";

export interface FetchProductsParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  category?: string;
}

export interface FetchProductsResponse {
  data: Product[];
  totalItems: number;
  totalPages: number;
}

export async function fetchProducts({
  page,
  pageSize,
  search,
  sortBy,
  category,
}: FetchProductsParams): Promise<FetchProductsResponse> {
  try {
    const response = await fetch("/src/mock/products.json");

    if (!response.ok) {
      throw new ApiError("Failed to fetch products", response.status);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      throw new ApiError("Invalid data format received");
    }

    let filteredData = data.data;
    // Search filter (simulating backend search)

    if (search) {
      filteredData = filteredData.filter((product: Product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Sort (simulating backend sorting)

    if (sortBy) {
      switch (sortBy) {
        case "price_asc":
          filteredData.sort((a: Product, b: Product) => a.price - b.price);
          break;
        case "price_desc":
          filteredData.sort((a: Product, b: Product) => b.price - a.price);
          break;
        case "name":
          filteredData.sort((a: Product, b: Product) =>
            a.name.localeCompare(b.name)
          );
          break;
      }
    }
    // category filter (simulating backend sorting)

    if (category) {
      filteredData = filteredData.filter((product: Product) =>
        product.categories.includes(category)
      );
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filteredData.slice(start, end),
      totalItems: filteredData.length,
      totalPages: Math.ceil(filteredData.length / pageSize),
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
}
