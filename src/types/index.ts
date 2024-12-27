export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductState {
  products: Product[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  searchQuery: string;
  isLoading: boolean;
}
