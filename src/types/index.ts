export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categories: string[];
  description: string;
}

export interface BasketItem extends Product {
  quantity: number;
}

export interface ProductState {
  basket: BasketItem[];
  products: Product[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}
