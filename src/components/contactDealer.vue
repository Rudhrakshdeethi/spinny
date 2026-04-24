<template>
  <Navbar />
  <div class="max-w-5xl mx-auto px-5 py-10 mt-20">
    <!-- Car + Dealer Card -->
    <div
      class="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-lg mb-8"
    >
      <div class="flex items-center gap-6">
        <!-- Car Image -->
        <div class="w-32 h-24 rounded-2xl overflow-hidden shadow-sm">
          <img
            :src="safePhotos(car.photos)[0]"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Info -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold tracking-tight">
            {{ car.name || "Loading..." }} • {{ car.year || "" }}
          </h2>
          <p class="text-gray-600 text-sm mt-1">
            {{ car.dealer_name || "Dealer Name" }} • Verified Dealer
          </p>
          <p class="text-emerald-600 text-sm font-medium">
            {{ car.status || "Available" }} • Quick Response
          </p>
        </div>

        <!-- Rating -->
        <div class="hidden sm:flex flex-col items-end">
          <div class="text-yellow-500 font-semibold text-xl">
            ⭐ {{ car.rating || "4.8" }}
          </div>
          <p class="text-gray-500 text-xs">142 Reviews</p>
        </div>
      </div>
    </div>

    <!-- Quick Action Buttons
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      <button
        class="py-3 rounded-2xl shadow bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Call
      </button>
      <button
        class="py-3 rounded-2xl shadow bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        WhatsApp
      </button>
      <button
        class="py-3 rounded-2xl shadow bg-amber-500 hover:bg-amber-600 text-white font-semibold"
      >
        Request Callback
      </button>
      <button
        class="py-3 rounded-2xl shadow bg-gray-900 hover:bg-black text-white font-semibold"
      >
        Test Drive
      </button>
    </div> -->

    <!-- Trust Badges -->
    <div class="grid sm:grid-cols-4 gap-4 mb-10">
      <div class="p-4 bg-white shadow rounded-xl text-center text-sm">
        ✔ Verified Seller
      </div>
      <div class="p-4 bg-white shadow rounded-xl text-center text-sm">
        ⚡ 24h Response
      </div>
      <div class="p-4 bg-white shadow rounded-xl text-center text-sm">
        🔐 Secure Contact
      </div>
      <div class="p-4 bg-white shadow rounded-xl text-center text-sm">
        🚗 Test Drive Ready
      </div>
    </div>

    <!-- Styled Contact Form -->
    <form
      action="https://formspree.io/f/xzzneqvo"
      method="POST"
      class="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 grid gap-5"
    >
      <h3 class="text-xl font-semibold mb-6 text-center">
        Send a Message to Dealer
      </h3>

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        class="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        class="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        required
        class="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        required
        class="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      <textarea
        name="message"
        placeholder="Message (optional)"
        rows="5"
        class="border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition resize-none"
      ></textarea>

      <button
        type="submit"
        class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg text-lg tracking-wide transition"
      >
        Send Message
      </button>

      <p class="text-xs text-gray-500 text-center">
        Your data stays private and encrypted.
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./Navbar.vue";

const route = useRoute();
const id = route.params.id;

const car = ref({});

// Safe photo parser
const safePhotos = (value) => {
  if (!value) return ["/placeholder-car.jpg"];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return [value];
  }
};

// Fetch car details from your SQLite backend
onMounted(() => {
  fetch(`https://dreamwheelsproject.onrender.com/cars/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => (car.value = data))
    .catch((err) => {
      console.error("Failed to fetch car data:", err);
      car.value = { photos: ["/placeholder-car.jpg"] };
    });
});
</script>
