<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';
import ProductItem from './ProductItem.vue';
import Pagination from './Pagination.vue';
import ProductListNav from './ProductListNav.vue';

defineOptions({
  name: 'ProductList'
});

const router = useRouter();
const route = useRoute();
const store = useProductStore();
const { products, isLoading, currentPage, totalPages } = storeToRefs(store);

const handlePageChange = (page: number) => {
  router.push({
    query: {
      ...route.query,
      page: page.toString()
    }
  });
};

// Watch route changes to update products
watch(
  () => route.query,
  async (query) => {
    const page = parseInt(query.page as string || '1');
    const search = query.search as string;
    const sort = query.sort as string;
    const category = query.category as string;

    await store.fetchProducts(page, search, sort, category);
  },
  { immediate: true }
);


// Initialize with URL parameters on mount
onMounted(async () => {
  await router.isReady();
  const currentQuery = route.query;
  if (!currentQuery.page && !currentQuery.search) {
    await router.replace({
      query: { page: '1' }
    });
  }
});
</script>

<template>
  <div class="container mx-auto px-4">
    <ProductListNav />
    
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
