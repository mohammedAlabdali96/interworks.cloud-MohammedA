<template>
  <select
    v-model="sortBy"
    @change="handleSort"
    class="w-full p-2 border rounded-md"
  >
    <option value="">Sort by</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
    <option value="name">Name</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "ProductSort",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const sortBy = ref((route.query.sort as string) || "");

    watch(
      () => route.query.sort,
      (newSort) => {
        sortBy.value = (newSort as string) || "";
      }
    );

    const handleSort = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      router.replace({
        query: {
          ...route.query,
          sort: target.value || undefined,
          page: "1",
        },
      });
    };

    return {
      sortBy,
      handleSort,
    };
  },
});
</script>
