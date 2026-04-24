<template>
  <div class="w-full bg-[#F8F8F8] py-6 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-5">
      <!-- Tabs Container -->
      <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          class="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center justify-center border hover:shadow-md hover:border-[#D81920]/80 hover:text-[#D81920] active:scale-95"
          :class="
            active === cat
              ? 'bg-[#E11B22] text-red-300 border-[#E11B22] shadow-md scale-[1.03]'
              : 'bg-white text-gray-700 border-gray-300'
          "
        >
          <!-- Animated Dot -->
          <span
            v-if="active === cat"
            class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"
          ></span>

          {{ cat }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ["All", "Hatchback", "Sedan", "SUV"];

const active = ref("All");
const emit = defineEmits(["change"]);

const selectCategory = (cat) => {
  active.value = cat;
  emit("change", cat);
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
