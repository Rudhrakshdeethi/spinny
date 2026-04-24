<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-[#E11B22] mb-6">Login</h2>

      <form class="space-y-5" @submit.prevent="loginUser">
        <!-- Username -->
        <div>
          <label for="username" class="block font-medium mb-1">Username</label>
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block font-medium mb-1">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-red-200 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>

      <!-- Redirect Link -->
      <p class="text-center text-gray-600 mt-4 text-sm">
        Don’t have an account?
        <a
          @click="router.push(`/register`)"
          class="text-[#E11B22] font-semibold hover:underline"
        >
          Register
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const loginUser = () => {
  fetch("https://dreamwheelsproject.onrender.com/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("jwt_token", data.jwt_token);
      console.log("Login successful:", router.push("/"));
      // Handle successful login (e.g., redirect, store token, etc.)
    })
    .catch((error) => {
      console.error("Error during login:", error);
      // Handle login error (e.g., show error message)
    });
};
</script>
