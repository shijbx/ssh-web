<template>
  <el-dialog v-model="visible" center @close="emit('close')" width="500px" :close-on-click-modal="false">
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
    </el-form>

    <template #footer>
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="save">Save</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import http from "@/utils/http";
import { ElMessage } from "element-plus";

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);
const router = useRouter();
const visible = ref(false);
const formRef = ref(null);

const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const matchPassword = (rule, value, callback) => {
  if (formData.value.confirmPassword && formData.value.newPassword !== formData.value.confirmPassword) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
const formRules = ref({
  oldPassword: [{ required: true, trigger: "blur", message: "Please enter old password." }],
  newPassword: [{ required: true, trigger: "blur", message: "Please enter new password." }],
  confirmPassword: [
    { required: true, trigger: "blur", message: "Please enter password again." },
    { trigger: "blur", validator: matchPassword },
  ],
});

watch(
  () => props.show,
  (val) => {
    visible.value = val;
  },
  {
    immediate: true,
  }
);

const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      http
        .post("/operate/BusOperateAccountServe/alterPassword", {
          newpassword: formData.value.newPassword,
          presentpassword: formData.value.oldPassword,
        })
        .then((res) => {
          ElMessage.success("Saved successfully!");
          emit("close");
        });
    }
  });
};

const cancel = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
