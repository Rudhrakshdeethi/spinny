<template>
  <div class="relative w-full h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
    <!-- Slides -->
    <transition-group
      name="fade"
      tag="div"
      class="h-full w-full absolute inset-0"
    >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        v-show="i === current.value"
        class="absolute inset-0"
      >
        <img :src="slide.img" class="w-full h-full object-cover" />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0"
        ></div>

        <div class="absolute bottom-10 left-10 text-white space-y-3">
          <h1 class="text-4xl font-extrabold drop-shadow-xl">
            {{ slide.title }}
          </h1>
          <p class="text-lg opacity-80 max-w-xl">
            {{ slide.desc }}
          </p>
        </div>
      </div>
    </transition-group>

    <!-- Prev -->
    <button
      @click="prev"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full hover:bg-white/40 transition"
    >
      ‹
    </button>

    <!-- Next -->
    <button
      @click="next"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-full hover:bg-white/40 transition"
    >
      ›
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <span
        v-for="(_, i) in slides"
        :key="'dot-' + i"
        @click="goTo(i)"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer transition',
          current.value === i ? 'bg-white' : 'bg-white/40',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1606169856822-67a88909252c",
    title: "Find Cars You’ll Love",
    desc: "Pre-inspected. Hassle-free. Delivered to your doorstep.",
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    title: "Top Picks for Every Budget",
    desc: "Trusted by millions of car buyers across India.",
  },
  {
    img: "https://images.unsplash.com/photo-1583122305400-939e94f4df40",
    title: "Drive with Confidence",
    desc: "Certified quality. Instant finance. Fast delivery.",
  },
];

const current = ref(0);
let timer = null;

const next = () => {
  current.value = (current.value + 1) % slides.length;
};

const prev = () => {
  current.value = (current.value - 1 + slides.length) % slides.length;
};

const goTo = (i) => {
  current.value = i;
};

onMounted(() => {
  timer = setInterval(next, 4500);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
