<template>
  <div class="login">
    <h1 class="title-bar">打包系统</h1>
    <el-link class="to-mobile" href="/m" v-if="isMobile.any">
      <el-icon color="#fff"><Iphone /></el-icon>
    </el-link>
    <div class="login-box">
      <p class="mb-50">尊贵的VIP大佬，请登录！</p>
      <el-form v-model="formData" label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="formData.account" clearable @keyup.enter="login"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formData.password" clearable show-password @keyup.enter="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import useLoginInfo from "@/store/useLoginInfo";
import http from "@/utils/http";
import { Iphone } from "@element-plus/icons";
import isMobile from "@/utils/isMobile";

const route = useRoute();
const router = useRouter();
const loginInfo = JSON.parse(localStorage.getItem("_b") ?? null) ?? {
  account: "",
  password: "",
  rememberMe: false,
};
const formData = ref(loginInfo);
const [_, setLoginInfo] = useLoginInfo();

const login = () => {
  http
    .post("/login/user", {
      loginName: formData.value.account,
      password: formData.value.password,
    })
    .then((res) => {
      router.push({ path: route.query.to || "/dashboard" });
      if (formData.value.rememberMe) {
        localStorage.setItem("_b", JSON.stringify(formData.value));
      }
      setLoginInfo(res.data);
    });
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #001529;
  position: relative;

  .title-bar {
    color: #fff;
  }

  .to-mobile {
    position: absolute;
    top: 125px;
    right: 30px;
    font-size: 20px;
  }

  .login-box {
    text-align: center;
    background: #fff;
    padding:50px;

    .el-form {
      text-align: left;
    }
  }
}
</style>
