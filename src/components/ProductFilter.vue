<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const filterBy = ref(route.query.category as string || '');

// Watch for route query changes to update filterBy
watch(
  () => route.query.category,
  (newCategory) => {
    filterBy.value = newCategory as string || '';
  }
);

const handleFilter = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  router.replace({
    query: {
      ...route.query,
      category: target.value || undefined,
      page: '1'
    }
  });
};
</script>

<template>
  <select 
    v-model="filterBy"
    @change="handleFilter"
    class="p-2 border rounded-md"
  >
    <option value="">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Fashion">Fashion</option>
    <option value="Home">Home</option>
  </select>
</template>
