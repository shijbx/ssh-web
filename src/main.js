import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "normalize.css";
import "@/styles/base.scss";

import directives from "@/utils/directives/index.js";
import CommonComponents from "@/components/commonComponents.js";

const app = createApp(App);
app.use(router).use(i18n).use(ElementPlus).use(directives).use(CommonComponents);
app.mount("#app");
