<template>
  <section
    class="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4"
  >
    <h1
      class="text-7xl md:text-9xl font-extrabold text-red-600 mb-6 animate-bounce"
    >
      404
    </h1>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">Page Not Found</h2>
    <p class="text-gray-600 mb-8">
      Oops! The page you are looking for does not exist or has been moved.
    </p>
    <router-link
      to="/"
      class="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
    >
      Go Back Home
    </router-link>

    <!-- Optional Car Illustration -->
    <img
      src="https://images.unsplash.com/photo-1618339807658-3f9f9b1a5d5e?auto=format&fit=crop&w=800&q=80"
      alt="Not Found Car"
      class="mt-12 w-80 md:w-96 rounded-xl shadow-xl"
    />
  </section>
</template>

<script setup>
// No extra logic needed for static 404 page
</script>

<style scoped>
/* Optional animation for bounce */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
