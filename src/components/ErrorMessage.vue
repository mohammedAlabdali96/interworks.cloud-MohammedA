<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
    <div class="flex items-center justify-center gap-2 text-red-600">
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>
