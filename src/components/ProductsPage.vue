<template>
  <section class="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
    <!-- Sidebar Filters -->
    <aside class="w-full lg:w-64 flex-shrink-0">
      <div class="sticky top-6 space-y-6">
        <!-- Clear All -->
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-semibold text-gray-700">Filters</h3>
          <button
            @click="clearFilters"
            class="text-sm text-red-600 hover:underline"
          >
            Clear All
          </button>
        </div>

        <!-- Search Bar -->
        <div class="bg-white p-4 rounded-xl shadow-sm">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name or model..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
        </div>

        <!-- Price Range -->
        <div class="bg-white p-5 rounded-xl shadow-sm space-y-3">
          <h4 class="font-semibold text-gray-700">Price Range (₹)</h4>
          <input
            type="range"
            v-model.number="filters.priceMax"
            :min="0"
            :max="10000000"
            step="50000"
            class="w-full accent-red-600"
          />
          <div class="flex justify-between text-sm text-gray-600">
            <span>Min: ₹{{ filters.priceMin.toLocaleString() }}</span>
            <span>Max: ₹{{ filters.priceMax.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Fuel Type -->
        <div class="bg-white p-5 rounded-xl shadow-sm">
          <h4 class="font-semibold mb-2 text-gray-700">Fuel Type</h4>
          <div class="flex flex-col gap-2">
            <label
              v-for="type in fuelTypes"
              :key="type"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                v-model="filters.fuel_type"
                :value="type"
                class="accent-red-600"
              />
              <span>{{ type }}</span>
            </label>
          </div>
        </div>

        <!-- Transmission -->
        <div class="bg-white p-5 rounded-xl shadow-sm">
          <h4 class="font-semibold mb-2 text-gray-700">Transmission</h4>
          <div class="flex flex-col gap-2">
            <label
              v-for="trans in transmissions"
              :key="trans"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                v-model="filters.transmission"
                :value="trans"
                class="accent-red-600"
              />
              <span>{{ trans }}</span>
            </label>
          </div>
        </div>

        <!-- Year -->
        <div class="bg-white p-5 rounded-xl shadow-sm">
          <h4 class="font-semibold mb-2 text-gray-700">Year</h4>
          <div class="flex flex-col gap-2 max-h-48 overflow-y-auto">
            <label
              v-for="year in availableYears"
              :key="year"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                v-model="filters.year"
                :value="year"
                class="accent-red-600"
              />
              <span>{{ year }}</span>
            </label>
          </div>
        </div>

        <!-- Applied Tags -->
        <div
          v-if="appliedTags.length"
          class="bg-white p-3 rounded-xl shadow-sm space-x-2 flex flex-wrap"
        >
          <span
            v-for="(tag, idx) in appliedTags"
            :key="idx"
            class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-red-200 transition"
            @click="removeTag(tag)"
          >
            {{ tag.label }} ✕
          </span>
        </div>
      </div>
    </aside>

    <!-- Car Grid -->
    <div
      class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
    >
      <CarCard v-for="car in filteredCars" :key="car.id" :car="car" />
      <div
        v-if="filteredCars.length == 0"
        class="col-span-full text-center text-gray-500 py-10"
      >
        No cars match the selected filters.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CarCard from "./CarCard.vue";

const cars = ref([]);
const searchQuery = ref(""); // <-- new search input
const filters = ref({
  fuel_type: [],
  transmission: [],
  year: [],
  priceMin: 0,
  priceMax: 10000000,
});

// Sidebar options
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const transmissions = ["Manual", "Automatic"];

// Load cars
onMounted(async () => {
  try {
    const res = await fetch("https://dreamwheelsproject.onrender.com/cars");
    const data = await res.json();
    cars.value = data;
  } catch (err) {
    console.error(err);
  }
});

// Dynamic years
const availableYears = computed(() => {
  const years = new Set(cars.value.map((c) => c.year));
  return Array.from(years).sort((a, b) => b - a);
});

// Applied tags
const appliedTags = computed(() => {
  const tags = [];
  if (filters.value.fuel_type.length)
    filters.value.fuel_type.forEach((f) =>
      tags.push({ type: "fuel", value: f, label: f }),
    );
  if (filters.value.transmission.length)
    filters.value.transmission.forEach((t) =>
      tags.push({ type: "trans", value: t, label: t }),
    );
  if (filters.value.year.length)
    filters.value.year.forEach((y) =>
      tags.push({ type: "year", value: y, label: y }),
    );
  return tags;
});

// Remove tag
const removeTag = (tag) => {
  if (tag.type === "fuel")
    filters.value.fuel_type = filters.value.fuel_type.filter(
      (f) => f !== tag.value,
    );
  if (tag.type === "trans")
    filters.value.transmission = filters.value.transmission.filter(
      (t) => t !== tag.value,
    );
  if (tag.type === "year")
    filters.value.year = filters.value.year.filter((y) => y !== tag.value);
};

// Clear all filters
const clearFilters = () => {
  filters.value.fuel_type = [];
  filters.value.transmission = [];
  filters.value.year = [];
  filters.value.priceMin = 0;
  filters.value.priceMax = 10000000;
  searchQuery.value = ""; // <-- clear search too
};

// Filtered cars (includes search query)
const filteredCars = computed(() => {
  return cars.value.filter((car) => {
    // Search filter
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      const nameMatch = car.name?.toLowerCase().includes(q);
      const modelMatch = car.model?.toLowerCase().includes(q);
      if (!nameMatch && !modelMatch) return false;
    }

    // Filters
    if (
      filters.value.fuel_type.length &&
      !filters.value.fuel_type.includes(car.fuel_type)
    )
      return false;
    if (
      filters.value.transmission.length &&
      !filters.value.transmission.includes(car.transmission)
    )
      return false;
    if (
      filters.value.year.length &&
      !filters.value.year.includes(Number(car.year))
    )
      return false;
    const price = Number(car.price) || 0;
    if (price < filters.value.priceMin || price > filters.value.priceMax)
      return false;
    return true;
  });
});
</script>
