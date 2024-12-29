<script setup lang="ts">
import ProductSearch from './ProductSearch.vue';
import ProductSort from './ProductSort.vue';
import ProductFilter from './ProductFilter.vue';
</script>

<template>
  <nav class="bg-white shadow-sm mb-6">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between gap-4">
        <ProductSearch />
        <div class="flex items-center gap-4">
          <ProductSort />
          <ProductFilter />
        </div>
      </div>
    </div>
  </nav>
</template>
