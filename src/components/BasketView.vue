<template>
  <div class="border rounded-lg p-4 shadow dark:bg-gray-800 dark:text-white">
    <h2 class="text-xl font-bold mb-4">Shopping Basket</h2>

    <div v-if="basket.length === 0" class="text-gray-500 text-center py-4">
      Your basket is empty
    </div>

    <div v-else>
      <div class="max-h-[calc(100vh-250px)] overflow-y-auto">
        <div
          v-for="item in basket"
          :key="item.id"
          class="flex items-center justify-between py-2 border-b"
        >
          <div class="flex-1">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">${{ item.price }}</p>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity === 1"
                class="px-2 py-1 border rounded-l disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-400 disabled:border-gray-200 enabled:text-gray-700 enabled:bg-white enabled:border-gray-300 enabled:hover:bg-gray-50"
              >
                -
              </button>
              <span class="px-4 py-1 border-t border-b">{{
                item.quantity
              }}</span>
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="px-2 py-1 border rounded-r"
              >
                +
              </button>
            </div>

            <button
              @click="removeItem(item.id)"
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4 text-right">
        <p class="text-lg font-bold">Total: ${{ calculateTotal.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useProductStore } from "../stores/productStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "BasketView",
  setup() {
    const store = useProductStore();
    const { basket } = storeToRefs(store);

    const updateQuantity = (productId: number, quantity: number) => {
      if (quantity > 0) {
        store.updateBasketItemQuantity(productId, quantity);
      }
    };

    const removeItem = (productId: number) => {
      store.removeFromBasket(productId);
    };

    const calculateTotal = computed(() => {
      return basket.value.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    });

    return {
      basket,
      updateQuantity,
      removeItem,
      calculateTotal,
    };
  },
});
</script>
