<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const sortBy = ref(route.query.sort as string || '');

watch(
  () => route.query.sort,
  (newSort) => {
    sortBy.value = newSort as string || '';
  }
);

const handleSort = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  router.replace({
    query: {
      ...route.query,
      sort: target.value || undefined,
      page: '1' // Reset to first page when sorting changes
    }
  });
};
</script>

<template>
  <select 
    v-model="sortBy"
    @change="handleSort"
    class="p-2 border rounded-md"
  >
    <option value="">Sort by</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
    <option value="name">Name</option>
  </select>
</template>
