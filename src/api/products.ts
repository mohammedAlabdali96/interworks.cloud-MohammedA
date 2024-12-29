import type { Product } from '../types';

export interface FetchProductsParams {
  page: number;
  search?: string;
}

export interface FetchProductsResponse {
  data: Product[];
  totalItems: number;
  totalPages: number;
}

export async function fetchProducts({ page, search }: FetchProductsParams): Promise<FetchProductsResponse> {
  const response = await fetch('/src/mock/products.json');
  const data = await response.json();


  // add in the DOC: in real life senario we have the we set the data for totalItems, totalPages from the response , so once the user search the response has the updated page number

  let filteredData = data.data;
  if (search) {
    filteredData = filteredData.filter((product: Product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filteredData.slice(start, end),
    totalItems: filteredData.length,
    totalPages: Math.ceil(filteredData.length / pageSize)
  };
}
