<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "./stores/themeStore";
import ProductList from "./components/ProductList.vue";
import BasketView from "./components/BasketView.vue";
import BasketButton from "./components/BasketButton.vue";

const isBasketOpen = ref(false);
const themeStore = useThemeStore();

const toggleBasket = () => {
  isBasketOpen.value = !isBasketOpen.value;
};

const handleOverlayClick = () => {
  isBasketOpen.value = false;
};
</script>

<template>
  <div :class="{ dark: themeStore.isDark }">
    <header class="fixed top-0 w-full bg-white dark:bg-gray-800 border-b z-30">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold dark:text-white">E-commerce Store</h1>
        <div class="flex items-center gap-4">
          <button
            @click="themeStore.toggleDark()"
            class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {{ themeStore.isDark ? "🌞" : "🌙" }}
          </button>
          <BasketButton @toggle-basket="toggleBasket" />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 pt-20 dark:bg-gray-900 min-h-screen">
      <ProductList />
    </main>

    <div
      class="overlay"
      :class="{ open: isBasketOpen }"
      @click="handleOverlayClick"
    ></div>

    <div class="sidebar dark:bg-gray-800" :class="{ open: isBasketOpen }">
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold dark:text-white">Your Basket</h2>
          <button
            @click="toggleBasket"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <BasketView />
      </div>
    </div>
  </div>
</template>
