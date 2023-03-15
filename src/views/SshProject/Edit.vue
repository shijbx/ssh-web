<template>
  <div>
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
      serverId: res.data.serverId,
      projectName: res.data.projectName,
      localPath: res.data.localPath,
      serverProjectPath: res.data.serverProjectPath,
      jarName: res.data.jarName,
      build: res.data.build,
      serverName: res.data.serverName,
      shText: res.data.shText,
      gitUrl: res.data.gitUrl,
      gitPath: res.data.gitPath,
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
    router.back();
  });
};
const cancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
