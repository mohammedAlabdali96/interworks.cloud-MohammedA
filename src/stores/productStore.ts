import { defineStore } from "pinia";
import type { Product, ProductState } from "../types";
import { useRouter, useRoute } from "vue-router";

export const useProductStore = defineStore("products", {
  state: (): ProductState => ({
    products: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalItems: 0,
    searchQuery: "",
    isLoading: false,
  }),

  actions: {
    async fetchProducts(page: number, search?: string) {
      this.isLoading = true;
      try {
        const response = await fetch("/src/mock/products.json");
        const data = await response.json();
        console.log(data);

        let filteredData = data.data;
        if (search) {
          filteredData = data.data.filter((product: Product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;

        // add in the DOC: in real life senario we have the we set the data for totalItems, totalPages from the response , so once the user search the response has the updated page number

        this.products = filteredData.slice(start, end);
        this.totalItems = filteredData.length;
        this.totalPages = Math.ceil(filteredData.length / this.pageSize);
        this.currentPage = page;
        this.searchQuery = search || "";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
