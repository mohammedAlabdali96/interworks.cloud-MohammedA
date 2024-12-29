import { defineStore } from 'pinia';
import type { Product, ProductState } from '../types';
import { fetchProducts } from '../api/products';

export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
    isLoading: false
  }),

  actions: {
    async fetchProducts(page: number, search?: string) {
      this.isLoading = true;
      try {
        const response = await fetchProducts({ page, search });
        this.products = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
