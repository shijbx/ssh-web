import { ref } from "vue";

const loginInfo = ref(JSON.parse(sessionStorage.getItem("user") ?? null) ?? {});

const setLoginInfo = (info) => {
  loginInfo.value = info;
  sessionStorage.setItem("user", JSON.stringify(info));
};

export default () => [loginInfo, setLoginInfo];
