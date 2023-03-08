<template>
  <el-icon :color="isActive ? '#015478' : '#6d000e'">
    <Check v-if="isActive" />
    <Close v-else />
  </el-icon>
</template>

<script setup>
import { Check, Close } from "@element-plus/icons";
const props = defineProps({
  isActive: Number,
});
</script>

<style lang="scss" scoped>
.el-icon {
  font-size: 20px;
  font-weight: bold;
}
</style>
