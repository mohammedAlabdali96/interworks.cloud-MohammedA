<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';
import ProductItem from './ProductItem.vue';
import Pagination from './Pagination.vue';
import debounce from 'lodash/debounce';

const router = useRouter();
const route = useRoute();
const store = useProductStore();
const { isLoading, currentPage, totalPages, searchQuery, products } = storeToRefs(store);

const debouncedSearch = debounce((value: string) => {
  router.replace({
    query: {
      ...route.query,
      search: value || undefined,
      page: '1'
    }
  });
}, 300);

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  debouncedSearch(target.value);
};

const handlePageChange = (page: number) => {
  router.push({
    query: {
      ...route.query,
      page: page.toString()
    }
  });
};

// Watch route changes to update products and store state
watch(
  () => route.query,
  async (query) => {
    const page = parseInt(query.page as string || '1');
    const search = query.search as string;
    
    // Update store state to match URL
    store.searchQuery = search || '';
    await store.fetchProducts(page, search);
  },
  { immediate: true }
);

// Initialize with URL parameters on mount
onMounted(async () => {
  
  // Wait for router to be ready
  await router.isReady();

  const currentQuery = route.query;
  console.log(currentQuery)
  if (!currentQuery.page && !currentQuery.search) {
    await router.replace({
      query: { page: '1' }
    });
  } else {
    const page = parseInt(currentQuery.page as string || '1');
    const search = currentQuery.search as string;
    await store.fetchProducts(page, search);
  }
});
</script>


<template>
  <div class="container mx-auto px-4">
    <div class="mb-4">
      <input 
        type="text"
        v-model="searchQuery"
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
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <Pagination
      v-if="!isLoading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>
