<template>
  <div class="container mx-auto px-4 py-4">
    <ProductListNav />

    <LoadingSpinner v-if="isLoading" />

    <ErrorMessage v-else-if="store.error" :message="store.error" />

    <NoItems v-else-if="!products.length" />

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <Pagination
      v-if="!isLoading && products.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "../stores/productStore";
import { storeToRefs } from "pinia";
import ProductItem from "./ProductItem.vue";
import Pagination from "./Pagination.vue";
import ProductListNav from "./ProductListNav.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import NoItems from "./NoItems.vue";
import ErrorMessage from "./ErrorMessage.vue";

export default defineComponent({
  name: "ProductList",
  components: {
    ProductItem,
    Pagination,
    ProductListNav,
    LoadingSpinner,
    NoItems,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useProductStore();
    const { products, isLoading, currentPage, totalPages } = storeToRefs(store);

    const handlePageChange = (page: number) => {
      router.push({
        query: {
          ...route.query,
          page: page.toString(),
        },
      });
    };

    watch(
      () => route.query,
      async (query) => {
        const page = parseInt((query.page as string) || "1");
        const search = query.search as string;
        const sort = query.sort as string;
        const category = query.category as string;

        await store.fetchProducts(page, search, sort, category);
      }
    );

    return {
      store,
      products,
      isLoading,
      currentPage,
      totalPages,
      handlePageChange,
    };
  },
});
</script>
