<template>
  <div>
    <h3>修改项目</h3>
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
  http.get(`/ssh/serverProject/getInfo/${route.params.id}`).then((res) => {
    formData.value = {
      projectId: res.data.projectId,
      projectName: res.data.projectName,
      localPath: res.data.localPath,
      targetPath: res.data.targetPath,
      jarName: res.data.jarName,
      serverName: res.data.serverName,
      gitUrl: res.data.gitUrl,
      gitLocalPath: res.data.gitLocalPath,
      gitUser: res.data.gitUser,
      gitPassword: res.data.gitPassword,
      gitSession: res.data.gitSession,
      isValid: res.data.isValid,
    };
  });
};
getDetail();

const save = () => {
  http.post("/ssh/serverProject/update", formData.value).then((res) => {
    ElMessage.success("更新成功!");
  });
};
const cancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
