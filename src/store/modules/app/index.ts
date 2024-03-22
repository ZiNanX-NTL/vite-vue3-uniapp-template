import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCountStore = defineStore(
  'count',
  () => {
    const count = ref(0);
    const increment = () => {
      count.value += 1;
    };
    const decrement = () => {
      count.value -= 1;
    };
    const reset = () => {
      count.value = 0;
    };
    return {
      count,
      decrement,
      increment,
      reset
    };
  },
  {
    persist: true
  }
);
