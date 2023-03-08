import TitleBar from "./TitleBar.vue";
import Empty from "./Empty.vue";
import Active from "./Active.vue";

export default {
  install(Vue) {
    Vue.component("TitleBar", TitleBar);
    Vue.component("Empty", Empty);
    Vue.component("Active", Active);
  },
};
