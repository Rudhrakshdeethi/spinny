<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 class="text-3xl font-extrabold text-center text-gray-900">
        Create Account
      </h2>
      <p class="text-center text-gray-500 mt-2 text-sm">
        Join the platform and explore curated car listings.
      </p>

      <form @submit.prevent="registerUser" class="mt-8 space-y-5">
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            required
            placeholder="Enter your username"
            class="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E11B22]"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E11B22]"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            required
            placeholder="Create a password"
            class="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E11B22]"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Re-enter password"
            class="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E11B22]"
          />
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-600 text-sm text-center font-medium">
          {{ error }}
        </p>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-3 bg-[#E11B22] hover:bg-[#C81018] font-bold rounded-xl shadow-md transition active:scale-95"
        >
          Register
        </button>

        <p class="text-center text-sm mt-3">
          Already have an account?
          <span
            @click="router.push('/login')"
            class="text-[#E11B22] font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const registerUser = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  try {
    const res = await fetch(
      "https://dreamwheelsproject.onrender.com/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      error.value = data.message || "Registration failed.";
      return;
    }

    router.push("/login");
  } catch (err) {
    error.value = "Server error. Try again.";
  }
};
</script>
