<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm mb-6">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row items-center gap-4">
        <ProductSearch class="w-full md:w-1/2" />
        <div class="flex w-full md:w-auto gap-4">
          <ProductSort class="flex-1 md:flex-none md:w-40" />
          <ProductFilter class="flex-1 md:flex-none md:w-40" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductSearch from "./ProductSearch.vue";
import ProductSort from "./ProductSort.vue";
import ProductFilter from "./ProductFilter.vue";

export default defineComponent({
  name: "ProductListNav",
  components: {
    ProductSearch,
    ProductSort,
    ProductFilter,
  },
});
</script>
