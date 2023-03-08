<template>
  <div>
    <el-form :model="formData" :rules="formRules" label-width="180px" ref="formRef">
      <el-form-item label="Old password:" prop="oldPassword">
        <el-input v-model.trim="formData.oldPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="New password:" prop="newPassword">
        <el-input v-model.trim="formData.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="Confirm password:" prop="confirmPassword">
        <el-input v-model.trim="formData.confirmPassword" show-password></el-input>
      </el-form-item>
      <slot />
    </el-form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
});

const formRef = ref(null);
const matchPassword = (rule, value, callback) => {
  if (props.formData.confirmPassword && props.formData.newPassword !== props.formData.confirmPassword) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
const passwordLengthRule = {
  trigger: "blur",
  min: 6,
  max: 12,
  message: "Please enter value between 6 and 12 characters long.",
};
const formRules = ref({
  oldPassword: [{ required: true, trigger: "blur", message: "Please enter old password." }, passwordLengthRule],
  newPassword: [{ required: true, trigger: "blur", message: "Please enter new password." }, passwordLengthRule],
  confirmPassword: [
    { required: true, trigger: "blur", message: "Please enter password again." },
    { trigger: "blur", validator: matchPassword },
  ],
});

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid) => {
      if (valid) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

defineExpose({ validate });
</script>

<style lang="scss" scoped></style>
