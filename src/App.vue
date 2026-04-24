<script setup>
import { RouterView } from "vue-router";

import footer from "./components/footer.vue";
alert(
  "Feel free to explore and wait for the server to start in the backend i.e( free tier render takes time)",
);
</script>

<template class="min-h-screen bg-[#F8F8F8]">
  <RouterView />
  <footer />
</template>
