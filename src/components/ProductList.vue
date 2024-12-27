<script setup lang="ts">
import { onMounted } from 'vue';
import Pagination from './Pagination.vue';
import ProductItem from './ProductItem.vue';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';

const store = useProductStore();
const { filteredProducts, isLoading, currentPage, totalPages } = storeToRefs(store);
const { fetchProducts, setSearchQuery } = store;

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setSearchQuery(target.value);
};

const handlePageChange = (page: number) => {
  fetchProducts(page);
};

onMounted(async () => {
    await store.fetchProducts(1); // Fetch first page on component mount
  });
defineOptions({
  name: 'ProductList'
});
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="mb-4">
      <input 
        type="text"
        v-model="store.searchQuery"
        @input="handleSearch"
        placeholder="Search products..."
        class="w-full p-2 border rounded-md"
      />
    </div>

    <div v-if="isLoading" class="text-center">
      Loading...
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>
