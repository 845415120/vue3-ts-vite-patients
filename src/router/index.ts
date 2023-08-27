import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
// @ts-ignore
// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        { path: "/home", component: () => import("@/views/home/index.vue") },
        {
          path: "/article",
          component: () => import("@/views/article/index.vue"),
        },
        {
          path: "/notify",
          component: () => import("@/views/notify/index.vue"),
        },
        { path: "/user", component: () => import("@/views/user/index.vue") },
      ],
    },
  ],
});

export default router;
