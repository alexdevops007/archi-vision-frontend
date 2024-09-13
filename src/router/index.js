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
  // Projects
  {
    path: "/projects",
    name: "Projects",
    component: () => import("../views/ProjectsView.vue"),
  },
  {
    path: "/projects/create",
    name: "NewProject",
    component: () => import("../components/project/ProjectForm.vue"),
  },
  {
    path: "/projects/edit/:id",
    name: "EditProject",
    component: () => import("../components/project/ProjectForm.vue"),
    props: true,
  },
  {
    path: "/projects/:id",
    name: "ProjectDetail",
    component: () => import("../components/project/ProjectDetail.vue"),
    props: true,
  },
  // Plan
  {
    path: "/plans",
    name: "Plans",
    component: () => import("../views/PlanGeneration.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
