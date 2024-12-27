<template>
    <div class="flex justify-center gap-2 mt-4">
      <button 
        @click="onPageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Previous
      </button>
      
      <span class="px-4 py-2">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      
      <button 
        @click="onPageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    emits: ['page-change'],
    setup(props, { emit }) {
      const onPageChange = (page: number) => {
        if (page >= 1 && page <= props.totalPages) {
          emit('page-change', page);
        }
      };
  
      return {
        onPageChange
      };
    }
  });
  </script>
  