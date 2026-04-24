<style scoped>
.mobile-item {
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  transition: all 0.25s ease;
}

.mobile-item:hover {
  color: #e11b22;
  font-weight: 600;
  transform: translateX(3px);
}
</style>

<template>
  <nav class="w-full fixed top-0 left-0 bg-white backdrop-blur-md shadow z-50">
    <div class="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3 cursor-pointer">
        <!-- <div class="w-9 h-9 bg-[#E11B22] rounded-full shadow"></div> -->
        <h1
          @click="$router.push('/')"
          class="text-2xl font-bold text-[#E11B22] tracking-tight"
        >
          DREAMWHEELS
        </h1>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex gap-8 font-medium text-[#3F3F3F] items-center">
        <router-link to="/"><li class="nav-item">Home</li> </router-link>
        <router-link to="/cars"><li class="nav-item">Buy Car</li> </router-link>
        <router-link to="/financing"
          ><li class="nav-item">Financing</li>
        </router-link>
        <router-link to="/support"
          ><li class="nav-item">Support</li>
        </router-link>

        <!-- FIXED BUTTON -->
        <button
          v-if="isLoginedIn === false"
          @click="$router.push('/login')"
          class="px-5 py-2 bg-[#e11b22] hover:bg-[#e11b22] transition text-black rounded-xl font-extrabold shadow-lg border border-white/40"
        >
          Sign in
        </button>
        <button
          v-if="isLoginedIn === true"
          @click="
            {
              logOut();
            }
          "
          class="px-5 py-2 bg-[#e11b22] hover:bg-[#e11b22] transition text-black rounded-xl font-extrabold shadow-lg border border-white/40"
        >
          Sign out
        </button>
      </ul>

      <!-- Mobile Hamburger -->
      <button
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
        class="md:hidden text-3xl font-light text-[#3F3F3F]"
      >
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white px-6 py-5 shadow-2xl rounded-b-2xl flex flex-col gap-4 font-semibold text-[#3F3F3F] border-t border-gray-200"
      >
        <router-link to="/"><li class="nav-item">Home</li> </router-link>
        <router-link to="/cars"><li class="nav-item">Buy Car</li> </router-link>
        <router-link to="/financing"
          ><li class="nav-item">Financing</li>
        </router-link>
        <router-link to="/support"
          ><li class="nav-item">Support</li>
        </router-link>

        <button
          v-if="isLoginedIn === false"
          @click="$router.push('/login')"
          class="px-5 py-2 bg-[#e11b22] hover:bg-[#e11b22] transition text-black rounded-xl font-extrabold shadow-lg border border-white/40"
        >
          Sign in
        </button>
        <button
          v-if="isLoginedIn === true"
          @click="
            {
              logOut();
            }
          "
          class="px-5 py-2 bg-[#e11b22] hover:bg-[#e11b22] transition text-black rounded-xl font-extrabold shadow-lg border border-white/40"
        >
          Sign out
        </button>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mobileOpen = ref(false);
const isLoginedIn = localStorage.getItem("jwt_token") ? true : false;

const logOut = () => {
  localStorage.removeItem("jwt_token");
  router.push("/login");
};
</script>

<style scoped>
/* Hover underline */
.nav-item {
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
}
.nav-item:hover {
  color: #e11b22;
}
.nav-item::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #e11b22;
  transition: width 0.25s ease;
}
.nav-item:hover::after {
  width: 100%;
}

/* Mobile */
.mobile-item {
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  transition: all 0.25s ease;
}
.mobile-item:hover {
  color: #e11b22;
  transform: translateX(3px);
  font-weight: 600;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.28s cubic-bezier(0.16, 0.8, 0.23, 1);
}
.slide-fade-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 0.8, 0.23, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
