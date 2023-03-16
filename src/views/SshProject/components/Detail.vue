<template>


  <div><h4>基础配置</h4></div>
  <div>
    <el-form class="mb-20" :model="formData" :rules="formRules" label-position="left" ref="formRef">

      <div style="display: flex">
        <el-form-item label="项目名称:" prop="projectName">
          <el-input v-model="formData.projectName"></el-input>
        </el-form-item>

        <el-form-item label="服务器名称:" prop="serverId">
          <el-cascader
              v-model="formData.serverId"
              :options="sList"
              :props="{ emitPath: false }"
              filterable
          ></el-cascader>
        </el-form-item>
      </div>

      <el-form-item label="项目路径:" prop="serverProjectPath">
        <el-input v-model="formData.serverProjectPath" style=width:400px></el-input>
      </el-form-item>
      <el-form-item label="jar包名称:" prop="jarName">
        <el-input v-model="formData.jarName" style=width:400px></el-input>
      </el-form-item>
      <br/>
      <div><h4>构建环境</h4></div>
      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="formData.buildType" prop="buildType" label="打包方式:">
          <el-radio :label="1" size="large">Maven</el-radio>
          <el-radio :label="2" size="large">Gradle</el-radio>
        </el-radio-group>
      </div>
      <el-form-item label="打包命令:" prop="build">
        <el-input v-model="formData.build" style=width:400px></el-input>
      </el-form-item>
      <br/>
      <div><h4>源码管理</h4></div>
      <el-form-item label="git地址:" prop="gitUrl">
        <el-input v-model="formData.gitUrl" style=width:400px></el-input>
      </el-form-item>
      <el-form-item label="服务器上git路径:" prop="gitPath">
        <el-input v-model="formData.gitPath" style=width:400px></el-input>
      </el-form-item>
      <div style="display: flex">
        <el-form-item label="git账号:" prop="gitUser">
          <el-input v-model="formData.gitUser"></el-input>
        </el-form-item>
        <el-form-item label="git密码:" prop="gitPassword">
          <el-input v-model="formData.gitPassword" show-password></el-input>
        </el-form-item>
      </div>
      <div><h4>执行 shell</h4></div>
      <el-form-item label="命令:" prop="shText">
        <el-input v-model="formData.shText" type="textarea" style=width:400px :rows="6"></el-input>
      </el-form-item>

      <el-form-item prop="isValid">
        <span class="mr-10">状态:</span>
        <el-switch v-model="formData.isValid" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="cancel">取消</el-button>
  </div>
</template>

<script setup>
import serverList from "@/store/serverList";

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["save", "cancel"]);
const sList = serverList();
const formRules = ref({
  projectName: [{required: true, message: "请输入项目名称", trigger: "blur"}],
  serverId: [{required: true, message: "请选择服务器", trigger: "blur"}],
  gitUrl: [{required: true, message: "请输入git地址", trigger: "blur"}],
  gitPath: [{required: true, message: "服务器上的git路径", trigger: "blur"}],
  gitUser: [{required: true, message: "请输入git账号", trigger: "blur"}],
  gitPassword: [{required: true, message: "请输入git密码", trigger: "blur"}],
  localPath: [{required: true, message: "请输入本地路径", trigger: "blur"}],
  serverProjectPath: [{required: true, message: "请输入目标路径", trigger: "blur"}],
  jarName: [{required: true, message: "请输入jar包名称", trigger: "blur"}],
  buildType: [{required: true, message: "请选择打包方式", trigger: "blur"}],
});
const formRef = ref("formRef");

const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit("save");
    }
  });
};
const cancel = () => emit("cancel");
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
