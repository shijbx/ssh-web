import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    vue(),
    // 自动导入vue3的hooks
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ["vue", "vue-router"],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
});
