<template>
<section class="w-full bg-white py-14">
  <div class="max-w-7xl mx-auto px-6">
    
    <!-- Title -->
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">
      Why Choose Us
    </h2>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div
        v-for="item in features"
        :key="item.title"
        class="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all hover:border-[#E11B22]/40 animate-fadeUp"
      >
        <!-- Icon -->
        <div
          class="w-16 h-16 flex items-center justify-center bg-[#E11B22]/10 text-[#E11B22] rounded-2xl text-3xl font-bold mb-4"
        >
          <i :class="item.icon"></i>
        </div>

        <h3 class="text-xl font-semibold text-gray-800">
          {{ item.title }}
        </h3>

        <p class="text-gray-500 text-sm mt-2 leading-relaxed">
          {{ item.desc }}
        </p>
      </div>

    </div>

  </div>
</section>
</template>

<script setup>
const features = [
  {
    title: "200+ Quality Checks",
    desc: "Every car goes through rigorous inspection to ensure top performance.",
    icon: "fas fa-shield-alt",
  },
  {
    title: "5-Day Return Policy",
    desc: "Not satisfied? Return the car within 5 days. No questions asked.",
    icon: "fas fa-undo",
  },
  {
    title: "Fixed Price Assurance",
    desc: "Transparent pricing with no hidden charges or negotiations.",
    icon: "fas fa-tags",
  },
];
</script>
