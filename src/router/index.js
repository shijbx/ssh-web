import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "@/styles/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
