<template>
  <div class="header">
    <el-dropdown>
      <el-link :underline="false" :icon="UserFilled">
        {{ loginInfo.loginName }}
        <el-icon class="ml-5"><ArrowDown /></el-icon>
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="myAccount">我的账户</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { HomeFilled, UserFilled, OfficeBuilding, ArrowDown } from "@element-plus/icons";
import useLoginInfo from "@/store/useLoginInfo";
import { ElMessageBox } from "element-plus";
import http from "@/utils/http";

const router = useRouter();
const [loginInfo, setLoginInfo] = useLoginInfo();

const logout = () => {
  ElMessageBox.confirm("", {
    title: "挖槽你tmd真要退出?",
    // type: "error",
    center: true,
  })
    .then(() => {
      http.get("/login/out").then((res) => {
        sessionStorage.setItem("user", null);
        setLoginInfo({});
        router.push({ name: "login" });
      });
    })
    .catch((err) => {});
};

const myAccount = () => {
  router.push({ name: "dashboard" });
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .el-link {
    margin-left: 40px;
    line-height: 1;

    > :deep(.el-icon) {
      font-size: 24px;
      margin-right: 10px;
    }

    > :deep(*) {
      vertical-align: middle;
    }

    .width-limit {
      display: inline-block;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
