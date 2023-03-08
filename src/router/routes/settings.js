import Layout from "@/components/Layout/index.vue";
import Settings from "@/views/Settings/index.vue";
import {Odometer, Setting} from "@element-plus/icons";
import { shallowRef } from "vue";

export default {
  path: "/settings",
  component: Layout,
  redirect: "/settings/index",
  meta: { title: "系统设置", icon: shallowRef(Odometer) },
  children: [
    {
      path: "/settings/index",
      name: "settings",
      component: Settings,
    }
  ],
};
