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

<script lang="ts">
import { defineComponent, ref, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "ProductSearch",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref((route.query.search as string) || "");

    const debouncedSearch = debounce((value: string) => {
      router.replace({
        query: {
          ...route.query,
          search: value || undefined,
          page: "1",
        },
      });
    }, 300);

    watch(
      () => route.query.search,
      (newSearch) => {
        searchQuery.value = (newSearch as string) || "";
      }
    );

    const handleSearch = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchQuery.value = target.value;
      debouncedSearch(target.value);
    };

    onUnmounted(() => {
      debouncedSearch.cancel();
    });

    return {
      searchQuery,
      handleSearch,
    };
  },
});
</script>
