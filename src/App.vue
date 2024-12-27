<template>
  <div class="container mx-auto px-4">
    <header class="py-6">
      <h1 class="text-2xl font-bold">E-commerce Store</h1>
    </header>
    <main>
      <ProductList />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from './components/ProductList.vue';

export default defineComponent({
  name: 'App',
  components: {
    ProductList
  }
});
</script>
