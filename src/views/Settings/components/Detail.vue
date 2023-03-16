<template>


  <div class="sub-title dash-border">缓存设置</div>
  <br/>
  <div>
    <el-form class="mb-20" label-position="left" >
      <el-form-item label="Redis" prop="redisKey">
        <el-input placeholder="输入*清除全部, 或者dic、dic*等 "  v-model="formData.redisKey"  style=width:400px></el-input>
      </el-form-item>
    </el-form>

    <el-button type="danger" @click="clearRedisKey">清除缓存</el-button>
  </div>
  <br/>
  <br/>
  <div class="sub-title dash-border">全局设置</div>
  <br/>
  <div>
    <el-form class="mb-20" :model="formData" :rules="formRules" label-position="left" ref="formRef">

      <el-form-item label="git 配置:" prop="gitConfig">
        <el-input v-model="formData.gitConfig" style=width:400px></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="Maven 配置:" prop="mavenConfig">
        <el-input v-model="formData.mavenConfig" style=width:400px></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="Gradle 配置:" prop="gradleConfig">
        <el-input v-model="formData.gradleConfig" style=width:400px></el-input>
      </el-form-item>
      <br/>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="cancel">取消</el-button>
  </div>
</template>

<script setup>

import {ElMessage, ElMessageBox} from "element-plus";
import http from "@/utils/http";


const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["save", "cancel"]);

const formRef = ref("formRef");

const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit("save");
    }
  });
};
const cancel = () => emit("cancel");

const clearRedisKey = () => emit("clearRedisKey");



</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  flex-direction: column;
  margin-bottom: 10px;
}

:deep(.el-input) {
  width: 200px;
}

:deep(.el-textarea) {
  width: 400px;
}
</style>
