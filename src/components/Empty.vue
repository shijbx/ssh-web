<template>
  <div class="empty">
    <el-icon size="24" color="#fab428">
      <Warning />
    </el-icon>

    <div class="ml-20">
      <div style="font-size: 14px; font-weight: bold">No results found for your query.</div>
      <div style="font-size: 14px">Check your spelling or try another term.</div>
    </div>
  </div>
</template>

<script setup>
import { Warning } from "@element-plus/icons";
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  border: 1px solid #f59a23;
  border-radius: 4px;
  background: #fffbe6;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
</style>
