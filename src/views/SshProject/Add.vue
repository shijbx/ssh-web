<template>
  <div>
    <Detail :formData="formData" @save="save" @cancel="cancel"></Detail>
  </div>
</template>

<script setup>
import Detail from "./components/Detail.vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";

const router = useRouter();

const formData = ref({
  projectName: "",
  jarName: "",
  serverId: "",
  localPath: "",
  serverProjectPath: "",
  build: "",
  shText: "",
  gitUrl: "",
  gitPath: "",
  gitUser: "",
  gitPassword: "",
  gitSession: "",
  isActive: 1,
});

const save = () => {
  http.post("/ssh/serverProject/save", formData.value).then((res) => {
    ElMessage.success("保存成功!");
    router.back();
  });
};
const cancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
