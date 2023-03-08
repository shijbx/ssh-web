<template>

  <div>
    <el-form inline class="mb-20" :model="formData" :rules="formRules" label-position="left" ref="formRef">
      <br/>
      <el-form-item label="项目名称:">
        <el-input v-model="formData.projectName" ></el-input>
      </el-form-item>
      <el-form-item label="服务器名称:">
        <el-input v-model="formData.serverId" ></el-input>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <el-form class="mb-20" :model="formData" :rules="formRules" label-position="left" ref="formRef">


      <el-form-item label="git地址:" prop="gitUrl">
        <el-input v-model="formData.gitUrl" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="git项目路径:" prop="gitLocalPath">
        <el-input v-model="formData.gitLocalPath" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="git账号:" prop="gitUser">
        <el-input v-model="formData.gitUser" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="git密码:" prop="gitPassword">
        <el-input v-model="formData.gitPassword" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="git秘钥:" prop="gitSession">
        <el-input v-model="formData.gitSession" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="本地路径:" prop="localPath">
        <el-input v-model="formData.localPath" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="jar包名称:" prop="jarName">
        <el-input v-model="formData.jarName" ></el-input>
      </el-form-item>
      <el-form-item label="目标路径:" prop="targetPath">
        <el-input v-model="formData.targetPath" type="textarea"></el-input>
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
import useCityList from "@/store/useCityList";

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["save", "cancel"]);

const cityList = useCityList();
const formRules = ref({
  projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  serverId: [{ required: true, message: "请选择服务器", trigger: "blur" }],
  gitUrl: [{ required: true, message: "请输入git地址", trigger: "blur" }],
  gitLocalPath: [{ required: true, message: "请输入git项目路径", trigger: "blur" }],
  gitUser: [{ required: true, message: "请输入git账号", trigger: "blur" }],
  gitPassword: [{ required: true, message: "请输入git密码", trigger: "blur" }],
  localPath: [{ required: true, message: "请输入本地路径", trigger: "blur" }],
  targetPath: [{ required: true, message: "请输入目标路径", trigger: "blur" }],
  jarName: [{ required: true, message: "请输入jar包名称", trigger: "blur" }],
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
