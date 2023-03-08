import homeRoutes from "./homeRoutes";
import Login from "@/views/Login/index.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: Login },
  ...homeRoutes,
];

export default routes;
