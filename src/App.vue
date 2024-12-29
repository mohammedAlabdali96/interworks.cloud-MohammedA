<script setup lang="ts">
import { ref } from 'vue';
import ProductList from './components/ProductList.vue';
import BasketView from './components/BasketView.vue';
import BasketButton from './components/BasketButton.vue';

const isBasketOpen = ref(false);

const toggleBasket = () => {
  isBasketOpen.value = !isBasketOpen.value;
};

// Close basket when clicking overlay
const handleOverlayClick = () => {
  isBasketOpen.value = false;
};
</script>

<template>
  <div>
    <header class="fixed top-0 w-full bg-white border-b z-30">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">E-commerce Store</h1>
        <BasketButton @toggle-basket="toggleBasket" />
      </div>
    </header>

    <main class="container mx-auto px-4 pt-20">
      <ProductList />
    </main>

    <!-- Overlay -->
    <div 
      class="overlay"
      :class="{ open: isBasketOpen }"
      @click="handleOverlayClick"
    ></div>

    <!-- Basket Sidebar -->
    <div 
      class="sidebar"
      :class="{ open: isBasketOpen }"
    >
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Your Basket</h2>
          <button 
            @click="toggleBasket"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <BasketView />
      </div>
    </div>
  </div>
</template>
