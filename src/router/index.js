import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/users",
    name: "user-management",
    component: () => import("../views/UserManagement.vue"),
  },
  {
    path: "/users/new",
    name: "user-form-new",
    component: () => import("../components/user/UserForm.vue"),
  },
  {
    path: "/users/:id",
    name: "user-detail",
    component: () => import("../components/user/UserDetail.vue"),
  },
  {
    path: "/users/edit/:id",
    name: "user-form-edit",
    component: () => import("../components/user/UserForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
