<template>
  <div>
    <Detail :formData="formData" @save="save" @cancel="cancel" @clearRedisKey="clearRedisKey"></Detail>
  </div>
</template>

<script setup>
import Detail from "./components/Detail.vue";
import http from "@/utils/http";
import {ElMessage} from "element-plus";
import useLoginInfo from "@/store/useLoginInfo";

const route = useRoute();
const router = useRouter();
const formData = ref({});
const [loginInfo] = useLoginInfo();
const redisKey = formData.value.redisKey ?? "*";

const getDetail = () => {
  http.get(`/ssh/user/getInfo/${loginInfo.value.userId}`).then((res) => {
    formData.value = {
      userId: loginInfo.value.userId,
      gitConfig: res.data.gitConfig,
      mavenConfig: res.data.mavenConfig,
      gradleConfig: res.data.gradleConfig,
    };
  });
};
getDetail();
const save = () => {
  http.post("/ssh/user/update", formData.value).then((res) => {
    ElMessage.success("更新成功!");
    getDetail();
  });
};
const cancel = () => {
  getDetail();
};

const clearRedisKey = () => {
  http.get(`/base/clearRedisKey/${redisKey}`).then((res) => {
    ElMessage.success(res.msg);
  });

};
</script>

<style lang="scss" scoped></style>
