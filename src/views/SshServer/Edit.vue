<template>
  <div>
    <h3>修改服务器</h3>
    <Detail :formData="formData" @save="save" @cancel="cancel"></Detail>
  </div>
</template>

<script setup>
import Detail from "./components/Detail.vue";
import http from "@/utils/http";
import {ElMessage} from "element-plus";

const route = useRoute();
const router = useRouter();
const formData = ref({});

const getDetail = () => {
  http.get(`/ssh/server/getInfo/${route.params.id}`).then((res) => {
    formData.value = {
      serverId: res.data.serverId,
      serverName: res.data.serverName,
      host: res.data.host,
      port: res.data.port,
      userName: res.data.userName,
      userPassword: res.data.userPassword,
      isValid: res.data.isValid,
      remark: res.data.remark,
    };
  });
};
getDetail();

const save = () => {
  http.post("/ssh/server/update", formData.value).then((res) => {
    ElMessage.success("修改成功!");
    router.back();
  });
};
const cancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
