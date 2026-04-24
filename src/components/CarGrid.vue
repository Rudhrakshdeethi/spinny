<template>
  <section class="max-w-7xl mx-auto px-4 py-16">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CarCard v-for="car in cars.slice(3, 7)" :key="car.id" :car="car" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CarCard from "./CarCard.vue";

const cars = ref([]); // reactive

onMounted(async () => {
  try {
    const res = await fetch("https://dreamwheelsproject.onrender.com/cars");
    const data = await res.json();
    console.log(data); // 👈 inspect this
    cars.value = data;
  } catch (err) {
    console.error("Failed to load cars:", err);
  }
});
</script>
