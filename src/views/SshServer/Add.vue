<template>
  <div>
    <h3>新增服务器</h3>
    <Detail :formData="formData" @save="save" @cancel="cancel"></Detail>
  </div>
</template>

<script setup>
import Detail from "./components/Detail.vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

const router = useRouter();

const formData = ref({
  serverName: "",
  host: "",
  port: "",
  userName: "",
  userPassword: "",
  isValid: 1,
  remark: "",
});

const save = () => {
  http.post("/ssh/server/save", formData.value).then((res) => {
    ElMessage.success("保存成功!");
    router.back();
  });
};
const cancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
