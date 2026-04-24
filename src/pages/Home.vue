<template>
  <div class="min-h-screen bg-[#F8F8F8]">
    <navbar class="mb-20" />
    <heroSection />
    <h2 class="text-2xl p-5 font-extrabold mt-20 ml-20">Recommended Cars</h2>
    <CarGrid />
    <ChooseUs />
    <CustomerTestimonial />
    <Faq />
    <Footer />
  </div>
</template>
<script setup>
import CarGrid from "@/components/CarGrid.vue";
import Navbar from "../components/navbar.vue";
import heroSection from "@/components/herosection.vue";
import ChooseUs from "@/components/chooseUs.vue";
import CustomerTestimonial from "@/components/customerTestimonial.vue";
import Faq from "@/components/faq.vue";
import Footer from "@/components/footer.vue";
</script>
