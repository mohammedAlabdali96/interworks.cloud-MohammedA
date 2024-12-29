import { useRouter, useRoute } from 'vue-router';

export function useProductFilters() {
  const router = useRouter();
  const route = useRoute();

  const handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;
    updateQueryParams({ search: target.value || undefined });
  };

  const handleSort = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    updateQueryParams({ sort: target.value || undefined });
  };

  const handleFilter = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    updateQueryParams({ category: target.value || undefined });
  };

  const updateQueryParams = (params: Record<string, string | undefined>) => {
    router.replace({
      query: {
        ...route.query,
        ...params,
        page: '1' // Reset to first page on filter change
      }
    });
  };

  return {
    handleSearch,
    handleSort,
    handleFilter
  };
}
