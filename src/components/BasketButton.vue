<template>
  <button
    @click="emit('toggle-basket')"
    class="relative p-2 text-gray-600 hover:text-gray-800"
  >
    <span class="text-xl">🛒</span>
    <span
      v-if="itemCount > 0"
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
    >
      {{ itemCount }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../stores/productStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "BasketButton",
  emits: ["toggle-basket"],
  setup(_, { emit }) {
    const store = useProductStore();
    const { basket } = storeToRefs(store);

    const itemCount = computed(() => {
      return basket.value.reduce((total, item) => total + item.quantity, 0);
    });

    return {
      itemCount,
      emit,
    };
  },
});
</script>
