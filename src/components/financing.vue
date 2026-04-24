<template>
  <navbar />
  <section class="max-w-7xl mx-auto px-4 py-12 mt-20">
    <h1
      class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center"
    >
      Car Financing & EMI Calculator
    </h1>

    <!-- Financing Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
      <div class="bg-red-50 p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Why Choose Financing?</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>Flexible payment options for your dream car.</li>
          <li>Low-interest rates with transparent EMI plans.</li>
          <li>Quick approval with minimal paperwork.</li>
          <li>Spread your payments over 12-60 months.</li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">EMI Calculator</h2>

        <div class="space-y-4">
          <!-- Car Price -->
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Car Price (₹)</label
            >
            <input
              type="number"
              v-model.number="carPrice"
              placeholder="Enter car price"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <!-- Down Payment -->
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Down Payment (₹)</label
            >
            <input
              type="number"
              v-model.number="downPayment"
              placeholder="Enter down payment"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <!-- Loan Tenure -->
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Tenure (months)</label
            >
            <input
              type="number"
              v-model.number="tenure"
              placeholder="Enter loan tenure in months"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <!-- Interest Rate -->
          <div>
            <label class="block mb-1 font-medium text-gray-700"
              >Interest Rate (% per annum)</label
            >
            <input
              type="number"
              v-model.number="interestRate"
              placeholder="Enter interest rate"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <!-- EMI Result -->
          <div class="mt-4 p-4 bg-red-50 rounded-lg text-center">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Estimated EMI
            </h3>
            <p class="text-3xl font-bold text-red-600">
              ₹{{ emi.toLocaleString() }}
            </p>
            <p class="text-gray-600 text-sm mt-1">per month</p>
          </div>
        </div>
      </div>
    </div>

    <!-- More Financing Info -->
    <div class="bg-white p-6 rounded-xl shadow-lg text-gray-700 space-y-4">
      <h2 class="text-2xl font-semibold mb-2">How It Works</h2>
      <p>
        Select your car, enter the price, down payment, tenure and interest
        rate. The EMI Calculator will instantly show your estimated monthly
        payments.
      </p>
      <p>
        You can customize your tenure and interest rate to see different options
        and choose a plan that suits your budget.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "./navbar.vue";
// EMI Calculator Inputs
const carPrice = ref(1000000);
const downPayment = ref(200000);
const tenure = ref(36); // months
const interestRate = ref(10); // % per annum

// EMI Computation
const emi = computed(() => {
  const principal = carPrice.value - downPayment.value;
  const monthlyRate = interestRate.value / 12 / 100;
  if (tenure.value === 0 || principal <= 0) return 0;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure.value)) /
    (Math.pow(1 + monthlyRate, tenure.value) - 1)
  ).toFixed(0);
});
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(225, 27, 34, 0.3);
}
</style>
