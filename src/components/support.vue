<template>
  <Navbar />
  <section class="max-w-7xl mx-auto px-4 py-12 mt-20">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        Need Help? We're Here!
      </h1>
      <p class="text-gray-600 text-lg md:text-xl">
        Our support team is available 24/7. Find answers to common questions or
        reach out directly.
      </p>
    </div>

    <!-- Support Channels -->
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <div
        class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
      >
        <div class="text-red-600 text-4xl mb-4">📞</div>
        <h3 class="font-semibold text-xl mb-2">Call Us</h3>
        <p class="text-gray-500">+91 12345 67890</p>
      </div>
      <div
        class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
      >
        <div class="text-red-600 text-4xl mb-4">📧</div>
        <h3 class="font-semibold text-xl mb-2">Email Support</h3>
        <p class="text-gray-500">support@spinnyclone.com</p>
      </div>
      <div
        class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center"
      >
        <div class="text-red-600 text-4xl mb-4">💬</div>
        <h3 class="font-semibold text-xl mb-2">Live Chat</h3>
        <p class="text-gray-500">Chat with our team instantly</p>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="mb-12">
      <h2 class="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div class="space-y-4 max-w-3xl mx-auto">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="bg-white p-5 rounded-xl shadow cursor-pointer"
          @click="toggleFaq(index)"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg">{{ item.question }}</h3>
            <span class="text-red-600 font-bold text-xl">
              {{ item.open ? "−" : "+" }}
            </span>
          </div>
          <p v-if="item.open" class="mt-2 text-gray-600">{{ item.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Your Name"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Your Email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
        />
        <textarea
          v-model="form.message"
          rows="5"
          placeholder="Your Message"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          required
        ></textarea>
        <button
          type="submit"
          class="w-full bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
      <p v-if="success" class="text-green-600 mt-4 text-center font-semibold">
        Your message has been sent successfully!
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import Navbar from "./Navbar.vue";

const faqs = reactive([
  {
    question: "How do I sell my car on Spinny Clone?",
    answer:
      "You can list your car by signing up and following our car selling guide.",
    open: false,
  },
  {
    question: "Do you provide car inspection reports?",
    answer:
      "Yes! Every car goes through a 200+ point inspection before listing.",
    open: false,
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee on all car purchases.",
    open: false,
  },
]);

const toggleFaq = (index) => {
  faqs[index].open = !faqs[index].open;
};

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const success = ref(false);

const submitForm = () => {
  console.log("Form submitted:", form);
  success.value = true;
  form.name = "";
  form.email = "";
  form.message = "";
  setTimeout(() => (success.value = false), 5000);
};
</script>

<style scoped>
/* Optional: smooth expand/collapse for FAQ */
</style>
