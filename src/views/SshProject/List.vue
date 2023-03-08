<template>
  <div>
    <h3>查询条件</h3>
    <el-form inline>
      <br/>
      <el-form-item label="服务器名称:">
        <el-input v-model="searchForm.serverName" clearable @keydown.enter="handleSearch"></el-input>
      </el-form-item>
      <el-form-item label="项目名称:">
        <el-input v-model="searchForm.projectName" clearable @keydown.enter="handleSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="ml-20" type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <br/>

    <TitleBar title="项目列表" class="mb-10">
      <template #right>
        <el-button type="primary" @click="create">新增</el-button>
      </template>
    </TitleBar>

    <el-table :data="tableData" border>
      <el-table-column label="项目名称" prop="projectName"></el-table-column>
      <el-table-column label="服务器名称" prop="serverName"></el-table-column>
      <el-table-column label="服务器ip" prop="host"></el-table-column>
      <el-table-column label="本地路径" prop="localPath"></el-table-column>
      <el-table-column label="目标路径" prop="targetPath"></el-table-column>
      <el-table-column label="jar名称" prop="jarName"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <span v-if="row.status" class="normal">● 在线</span>
          <span v-else class="suspend">● 离线</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" prop="actions" width="220px">
        <template #default="{ row }">
          <el-button type="success" color="#00a854" size="small" @click="sendPackage(row)">发包</el-button>
          <el-button type="primary" size="small" @click="handleEdit(row)">修改</el-button>
          <el-button type="danger" size="small" color="#f31a1a" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="mt-10"
        v-model:current-page="page.index"
        :page-size="page.size"
        :total="page.total"
        layout="total, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import http from "@/utils/http";

const router = useRouter();
const searchForm = ref({
  serverName: null,
  projectName: null,
  isActive: null,
});

const tableData = ref([]);
const page = ref({
  index: 1,
  size: 10,
  total: 0,
});
const postList = () => {
  http.get("/ssh/serverProject/queryListByPage", {
    params: {
      pageNum: page.value.index,
      pageSize: page.value.size,
      ...searchForm.value,
    },
  })
      .then((res) => {
        tableData.value = res.data.records ?? [];
        page.value.total = res.data.total || 0;
      });
};
postList();
watch(
    () => page.value.index,
    (newVal, oldVal) => {
      postList();
    }
);
const search = () => {
  if (page.value.index === 1) {
    postList();
  } else {
    page.value.index = 1;
  }
};

const create = () => router.push({name: "addProject"});

const sendPackage = (row) => {

  ElMessageBox.alert("", {
    title: "你TM的要想清楚？",
    type: "error",
    center: true,
  })
      .then((res) => {
        http.post("/ssh/serverProject/delete1", {id: row.projectId}).then((res) => {
          ElMessage.success("删除成功!");
          postList();
        });
      })
      .catch((err) => {
      });
};

const handleEdit = (row) => {
  router.push({name: "editProject", params: {id: row.projectId}});
};

const handleDelete = (row) => {
  ElMessageBox.confirm("", {
    title: "你TM的要想清楚？",
    type: "error",
    center: true,
  })
      .then((res) => {
        http.post("/ssh/serverProject/delete", {id: row.projectId}).then((res) => {
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
  color: #807272;
}
</style>
