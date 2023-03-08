import { createI18n } from "vue-i18n/dist/vue-i18n.cjs.js";
import zh from "./locales/zh";
import en from "./locales/en";

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "zh",
  messages: {
    zh,
    en,
  },
});
export default i18n;
