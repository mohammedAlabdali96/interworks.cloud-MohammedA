import { defineStore } from 'pinia';
import type { Product } from '../types';

interface ProductState {
  products: Product[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  searchQuery: string;
  isLoading: boolean;
}

export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
    searchQuery: '',
    isLoading: false
  }),

  getters: {
    filteredProducts(state): Product[] {
      if (!state.searchQuery) return state.products;
      return state.products.filter((product: Product) => 
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }
  },

  actions: {
    async fetchProducts(page: number) {
      this.isLoading = true;
      try {
        const response = await fetch('/src/mock/products.json');
        const data = await response.json();
        console.log(data)
        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.products = data.data.slice(start, end);
        this.totalItems = data.pagination.totalItems;
        this.totalPages = data.pagination.totalPages
        this.currentPage = page;
      } finally {
        this.isLoading = false;
      }
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
    }
  }
});
