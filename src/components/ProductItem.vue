<script setup lang="ts">
import { defineProps } from 'vue';
import { useProductStore } from '../stores/productStore';
import type { Product } from '../types';

const props = defineProps<{
  product: Product;
}>();

const store = useProductStore();

const handleAddToCart = () => {
  store.addToBasket(props.product);
};
</script>

<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
    <img 
      :src="product.image" 
      :alt="product.name"
      class="w-full h-48 object-cover rounded-md mb-4"
    />
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2 text-sm line-clamp-2">{{ product.description }}</p>
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
