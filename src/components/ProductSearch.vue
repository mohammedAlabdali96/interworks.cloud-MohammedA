<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import debounce from 'lodash/debounce';

const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query.search as string || '');


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
  searchQuery.value = target.value;
  debouncedSearch(target.value);
};

// Clean up debounce on component unmount
onUnmounted(() => {
  debouncedSearch.cancel();
});
</script>

<template>
  <div class="flex-1">
    <input 
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search products..."
      class="w-full p-2 border rounded-md"
    />
  </div>
</template>
