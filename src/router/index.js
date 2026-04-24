import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/cars",
      name: "Cars",
      component: () => import("../pages/Carspage.vue"),
    },
    {
      path: "/cars/:id",
      name: "Car",
      component: () => import("../components/CarDeatilsPage.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/register.vue"),
    },
    {
      path: "/support",
      name: "Support",
      component: () => import("../components/support.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../components/notfound.vue"),
    },
    {
      path: "/financing",
      name: "Financing",
      component: () => import("../components/financing.vue"),
    },
    {
      path: "/cars/:id/dealer-contact",
      name: "CarDealerContact",
      component: () => import("../components/contactDealer.vue"),
    },
  ],
});

export default router;
