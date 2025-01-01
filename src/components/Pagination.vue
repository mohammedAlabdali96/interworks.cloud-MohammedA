<template>
  <div class="flex items-center justify-center space-x-4 my-6 border rounded-lg p-4 ">
    <button
      @click="onPageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 text-sm font-medium rounded-md transition-colors
        dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600
        dark:hover:bg-gray-600 dark:hover:border-gray-500
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        disabled:hover:bg-transparent
        disabled:dark:hover:bg-transparent
        disabled:text-gray-400
        disabled:dark:text-gray-500
        disabled:border-gray-200
        disabled:dark:border-gray-700
        enabled:text-gray-700 
        enabled:bg-white 
        enabled:border-gray-300 
        enabled:hover:bg-gray-50
        border"
    >
      Previous
    </button>

    <span class="px-4 py-2 text-sm font-medium dark:text-gray-200">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      @click="onPageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 text-sm font-medium rounded-md transition-colors
        dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600
        dark:hover:bg-gray-600 dark:hover:border-gray-500
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        disabled:hover:bg-transparent
        disabled:dark:hover:bg-transparent
        disabled:text-gray-400
        disabled:dark:text-gray-500
        disabled:border-gray-200
        disabled:dark:border-gray-700
        enabled:text-gray-700 
        enabled:bg-white 
        enabled:border-gray-300 
        enabled:hover:bg-gray-50
        border"
    >
      Next
    </button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-change"],
  setup(props, { emit }) {
    const onPageChange = (page: number) => {
      if (page >= 1 && page <= props.totalPages) {
        emit("page-change", page);
      }
    };

    return {
      onPageChange,
    };
  },
});
</script>
