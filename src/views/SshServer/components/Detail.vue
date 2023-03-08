<template>
  <div>
    <el-form class="mb-20" :model="formData" :rules="formRules" label-position="left" ref="formRef">
      <el-form-item label="服务器名称:" prop="serverName">
        <el-input v-model="formData.serverName"></el-input>
      </el-form-item>
      <el-form-item label="服务器IP:" prop="host">
        <el-input v-model="formData.host"></el-input>
      </el-form-item>
      <el-form-item label="端口号:" prop="port">
        <el-input v-model="formData.port" model-value=22></el-input>
      </el-form-item>
      <el-form-item label="登录账号:" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="登录密码:" prop="userPassword">
        <el-input v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="formData.remark" type="textarea"></el-input>
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

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["save", "cancel"]);

const formRules = ref({
  serverName: [{ required: true, message: "请输入服务器名称", trigger: "blur" }],
  host: [{ required: true, message: "请输入服务器IP", trigger: "blur" }],
  userName: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
  userPassword: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
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
