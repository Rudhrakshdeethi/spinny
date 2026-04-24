<template>
  <div
    id="card"
    @click="router.push(`/cars/${car.id}`)"
    class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
  >
    <!-- Image Section -->
    <div class="relative">
      <img
        :src="car.photos ? JSON.parse(car.photos)[0] : '/placeholder-car.jpg'"
        :alt="`Image of ${car.name}`"
        class="w-full h-52 object-cover transition-all duration-500 group-hover:scale-[1.07]"
      />

      <!-- Year Tag -->
      <span
        class="absolute top-3 left-3 bg-[#E11B22] bold px-3 py-1 rounded-full text-xs font-semibold shadow-md"
      >
        {{ car.year }}
      </span>

      <!-- Hover Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
      ></div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3
        class="text-[17px] font-extrabold text-[#1B1B1B] leading-snug group-hover:text-[#E11B22] transition"
      >
        {{ car.name }}
      </h3>

      <p class="text-sm text-gray-500 mt-1">{{ car.model }}</p>

      <div
        class="flex justify-between text-[13px] text-gray-600 mt-4 mb-4 font-medium"
      >
        <span>{{ car.kms_driven }} km</span>
        <span>{{ car.fuel_type }}</span>
        <span>{{ car.registration_state }}</span>
      </div>

      <div class="border-t border-gray-200 my-3"></div>

      <div class="flex justify-between items-center mt-2">
        <p class="text-[20px] font-extrabold text-[#1B1B1B] tracking-tight">
          ₹ {{ car.price }}
        </p>

        <button
          class="px-5 py-2.5 bg-[#E11B22] hover:bg-[#C81018] text-sm font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps({
  car: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
#card {
  max-height: 420px;
}
</style>
