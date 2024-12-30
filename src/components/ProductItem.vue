<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover rounded-md mb-4"
    />
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2 text-sm line-clamp-2">
      {{ product.description }}
    </p>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="category in product.categories"
        :key="category"
        class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
      >
        {{ category }}
      </span>
    </div>

    <div class="flex justify-between items-center mt-4">
      <span class="text-lg font-bold">${{ product.price }}</span>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        @click="handleAddToCart"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProductStore } from "../stores/productStore";
import type { Product } from "../types";

export default defineComponent({
  name: "ProductItem",
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props) {
    const store = useProductStore();

    const handleAddToCart = () => {
      store.addToBasket(props.product);
    };

    return {
      handleAddToCart,
    };
  },
});
</script>
