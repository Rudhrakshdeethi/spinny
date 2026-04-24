<template>
  <div class="max-w-3xl mx-auto p-6">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
      <button
        class="w-full flex justify-between items-center bg-gray-100 rounded-xl px-5 py-4 text-left shadow-sm hover:bg-gray-200 transition"
        @click="toggle(index)"
      >
        <span class="text-[16px] font-semibold text-gray-800">{{
          faq.question
        }}</span>

        <span
          class="text-gray-600 text-xl transition-transform"
          :class="openIndex === index ? 'rotate-180' : ''"
        >
          ▼
        </span>
      </button>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="openIndex === index"
          class="bg-white px-5 py-4 border border-gray-200 rounded-xl mt-2 text-gray-700 text-[15px]"
        >
          {{ faq.answer }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const toggle = (i) => {
  openIndex.value = openIndex.value === i ? null : i;
};

const faqs = ref([
  {
    question: "What documents are required to buy a car?",
    answer:
      "You typically need an ID proof, address proof, PAN card, and a valid driving license.",
  },
  {
    question: "Can I schedule a test drive?",
    answer:
      "Yes! You can request a test drive through our website or visit the nearest showroom.",
  },
  {
    question: "Is financing available?",
    answer:
      "We offer multiple finance options with leading banks and NBFCs at competitive interest rates.",
  },
  {
    question: "Do the cars come with warranty?",
    answer:
      "Most cars come with a warranty depending on their age, condition, and manufacturer coverage.",
  },
]);
</script>

<style scoped></style>
