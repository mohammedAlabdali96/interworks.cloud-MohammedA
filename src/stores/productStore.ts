import { defineStore } from "pinia";
import type { Product, ProductState } from "../types";
import { fetchProducts } from "../api/products";
import { ApiError } from "../utils/errors";

export const useProductStore = defineStore("products", {
  state: (): ProductState => ({
    basket: [],
    products: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 9,
    totalItems: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts(
      page: number,
      search?: string,
      sortBy?: string,
      category?: string
    ) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetchProducts({
          page,
          pageSize: this.pageSize,
          search,
          sortBy,
          category,
        });
        this.products = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.error =
          error instanceof ApiError
            ? error.message
            : "An unexpected error occurred";
        this.products = [];
        this.totalItems = 0;
        this.totalPages = 0;
      } finally {
        this.isLoading = false;
      }
    },

    addToBasket(product: Product) {
      const existingItem = this.basket.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.basket.push({ ...product, quantity: 1 });
      }
    },

    updateBasketItemQuantity(productId: number, quantity: number) {
      const item = this.basket.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromBasket(productId: number) {
      const index = this.basket.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.basket.splice(index, 1);
      }
    },
  },
});
