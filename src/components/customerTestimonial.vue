<template>
  <div class="w-full bg-[#F8F8F8] py-16">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">
        Loved by Thousands of Happy Customers
      </h2>

      <div
        class="relative px-12 select-none"
        @touchstart="startSwipe"
        @touchend="endSwipe"
      >
        <!-- Arrow: Left -->
        <button
          @click="prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg flex items-center justify-center hover:scale-110 transition-all"
        >
          <i class="fas fa-chevron-left text-gray-700 text-lg"></i>
        </button>

        <!-- Slides -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-700 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(t, i) in testimonials"
              :key="i"
              class="min-w-full px-4 flex justify-center"
            >
              <div
                class="w-full md:w-[70%] bg-white rounded-2xl shadow-lg p-8 transition-all duration-500"
                :class="
                  currentIndex === i
                    ? 'scale-100 opacity-100'
                    : 'scale-95 opacity-60'
                "
              >
                <div class="flex items-center gap-4 mb-4">
                  <img
                    :src="t.image"
                    class="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ t.name }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ t.location }}</p>
                  </div>
                </div>

                <p class="text-gray-700 leading-relaxed text-lg">
                  “{{ t.review }}”
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrow: Right -->
        <button
          @click="next"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg flex items-center justify-center hover:scale-110 transition-all"
        >
          <i class="fas fa-chevron-right text-gray-700 text-lg"></i>
        </button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center mt-8 gap-2">
        <div
          v-for="(dot, i) in testimonials.length"
          :key="i"
          @click="goTo(i)"
          class="rounded-full cursor-pointer transition-all duration-300"
          :class="
            currentIndex === i
              ? 'bg-[#E11B22] w-4 h-4 border border-[#C81018] shadow-md'
              : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const testimonials = [
  {
    name: "Amit Sharma",
    location: "Bangalore",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Buying a car was absolutely effortless. The inspection report and home test drive were game changers!",
  },
  {
    name: "Sonal Patel",
    location: "Mumbai",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    review:
      "Super smooth delivery and the car was exactly as shown. Trustworthy experience end-to-end.",
  },
  {
    name: "Rakesh Nair",
    location: "Hyderabad",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    review:
      "Amazing collection and great staff support. Felt like buying from a premium showroom.",
  },
];

const currentIndex = ref(0);
let interval;

// Auto-slide
onMounted(() => {
  interval = setInterval(() => {
    next();
  }, 4000); // slide every 4 seconds
});

onUnmounted(() => {
  clearInterval(interval);
});

const next = () => {
  currentIndex.value =
    currentIndex.value === testimonials.length - 1 ? 0 : currentIndex.value + 1;
};

const prev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? testimonials.length - 1 : currentIndex.value - 1;
};

const goTo = (i) => {
  currentIndex.value = i;
};

// --- Swipe Support ---
let startX = 0;

const startSwipe = (e) => {
  startX = e.touches[0].clientX;
};

const endSwipe = (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? prev() : next();
  }
};
</script>
