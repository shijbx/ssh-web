<template>
  <div>
    <h3>查询条件</h3>
    <el-form inline>
      <br/>
      <el-form-item label="服务器名称:">
        <el-input v-model="searchForm.serverName" clearable @keydown.enter="handleSearch"></el-input>
      </el-form-item>
      <el-form-item label="服务器IP:">
        <el-input v-model="searchForm.host" clearable @keydown.enter="handleSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="ml-20" type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <br/>

    <TitleBar title="服务器列表" class="mb-10">
      <template #right>
        <el-button type="primary" @click="create">新增</el-button>
      </template>
    </TitleBar>


    <el-table :data="tableData" border>
      <el-table-column label="服务器名称" prop="serverName"></el-table-column>
      <el-table-column label="服务器IP" prop="host"></el-table-column>
      <el-table-column label="端口号" prop="port"></el-table-column>
      <el-table-column label="登录账号" prop="userName"></el-table-column>
      <el-table-column label="状态" prop="isValid">
        <template #default="{ row }">
          <span v-if="row.isValid == 1" class="normal">启用</span>
          <span v-else class="suspend">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>

      <el-table-column label="操作" prop="actions" width="220px">
        <template #default="{ row }">
          <el-button type="primary" size="small" color="#00a854" @click="connectionTest(row)">连接测试</el-button>
          <el-button type="primary" size="small" @click="handleEdit(row)">修改</el-button>
          <el-button type="danger" size="small" color="#f31a1a" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import http from "@/utils/http";
import {saveAs} from "file-saver";

const router = useRouter();
const searchForm = ref({
  serverName: null,
  projectName: null,
  isActive: null,
});

const tableData = ref([]);

const postList = () => {
  http.get("/ssh/server/queryList", {
    params: {
      ...searchForm.value,
    },
  })
      .then((res) => {
        tableData.value = res.data ?? [];
      });
};
postList();

const search = () => {
  postList();
};

const create = () => router.push({name: "addServer"});
const handleEdit = (row) => { router.push({name: "editServer", params: {id: row.serverId}});};

const connectionTest = (row) => {

  http.get(`/ssh/server/connectionTest/${route.params.id}`).then((res) => {
    ElMessage.success(res.data);
  });

};

const handleDelete = (row) => {
  ElMessageBox.confirm("", {
    title: "你TM的要想清楚？",
    type: "error",
    center: true,
  })
      .then((res) => {
        http.post("/ssh/server/delete", {id: row.serverId}).then((res) => {
          ElMessage.success("删除成功!");
          postList();
        });
      })
      .catch((err) => {
      });
};
</script>

<style lang="scss" scoped>
:deep(.el-table th) {
  background: #ddeeff;
}

:deep(.el-table__expanded-cell) {
  border-bottom: 0px;
  border-right: 0px;
  padding: 0px 0px 0px 47px;
}

.normal {
  color: #00a854;
}

.suspend {
  color: #6d000e;
}
</style>
