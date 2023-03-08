import Layout from "@/components/Layout/index.vue";
import Dashboard from "@/views/Dashboard/index.vue";
import { Odometer } from "@element-plus/icons";
import { shallowRef } from "vue";

export default {
  path: "/dashboard",
  component: Layout,
  redirect: "/dashboard/index",
  meta: { title: "主页", icon: shallowRef(Odometer) },
  children: [
    {
      path: "/dashboard/index",
      name: "dashboard",
      component: Dashboard,
    }
  ],
};
