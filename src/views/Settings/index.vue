<template>
  <div>
    <h3>系统设置</h3>

    <div>
      <div style="display: flex; align-item">
        <div class="sub-title mr-30">{{ operateInfo.name }}</div>
        <el-upload
          :show-file-list="false"
          :action="uploadData.action"
          :headers="uploadData.headers"
          :on-success="uploadData.onSuccess"
          :on-error="uploadData.onError"
        >
          <el-image :src="operateInfo.logoUrl" class="logo-pic" fit="contain">
            <template #error>
              <el-icon size="195px" color="#999"><Picture /></el-icon>
            </template>
          </el-image>
        </el-upload>
      </div>
      <div class="detail-item dash-border">
        <div class="intro-box">{{ operateInfo.intro }}</div>
        <el-link type="primary" @click="edit(2, 'intro', 'Company profile')">Edit</el-link>
      </div>
      <div class="detail-item dash-border">
        <div style="display: flex">
          <label>Additional Amenities:</label>
          <div>
            <div v-for="item in (operateInfo.amenities ?? []).filter((o) => o.pick === 1)" :key="item.id">
              {{ item.text }}
            </div>
          </div>
        </div>
        <el-link type="primary" @click="edit(3, 'amenities', 'Additional Amenities')">Edit</el-link>
      </div>
      <div class="sub-title dash-border">Contact Information</div>
      <div class="detail-item dash-border">
        <div>
          <label>Phone:</label>
          <span>{{ operateInfo.phone }}</span>
        </div>
        <el-link type="primary" @click="edit(1, 'phone', 'Phone')">Edit</el-link>
      </div>
      <div class="detail-item dash-border">
        <div>
          <label>Address:</label>
          <span>{{ operateInfo.address }}</span>
        </div>
        <el-link type="primary" @click="edit(2, 'address', 'Address')">Edit</el-link>
      </div>
      <div class="detail-item dash-border">
        <div>
          <label>Fax:</label>
          <span>{{ operateInfo.fax }}</span>
        </div>
        <el-link type="primary" @click="edit(1, 'fax', 'Fax')">Edit</el-link>
      </div>
      <div class="detail-item dash-border">
        <div>
          <label>Email:</label>
          <span>{{ operateInfo.email }}</span>
        </div>
        <el-link type="primary" @click="edit(1, 'email', 'Email')">Edit</el-link>
      </div>
    </div>

    <el-dialog v-model="editForm.visible" width="500px" :close-on-click-modal="false">
      <el-form :model="editForm" :label-width="editForm.type === 1 ? '200px' : undefined" :rules="formRule">
        <el-form-item :label="editForm.label + ':'" prop="value" v-if="editForm.type === 1">
          <el-input v-model="editForm.value"></el-input>
        </el-form-item>
        <el-form-item :label="editForm.label + ':'" prop="value" class="no-flex" v-else-if="editForm.type === 2">
          <el-input type="textarea" v-model="editForm.value" :rows="5"></el-input>
        </el-form-item>
        <el-form-item :label="editForm.label + ':'" prop="value" class="no-flex" v-else-if="editForm.type === 3">
          <div class="amenities-box">
            <el-checkbox
              v-for="item in editForm.value"
              :key="item.value"
              v-model="item.pick"
              :true-label="1"
              :false-label="0"
              >{{ item.text }}</el-checkbox
            >
          </div>
        </el-form-item>
        <el-form-item label="Execution Password:" prop="password">
          <el-input v-model="editForm.password" show-password></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" :disabled="!editForm.value || !editForm.password" @click="save"
          >Save Changes</el-button
        >
        <el-button type="primary" @click="cancel">Cancel</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import http from "@/utils/http";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import useLoginInfo from "@/store/useLoginInfo";
import { Picture } from "@element-plus/icons";
import baseURL from "@/api/baseURL";

const [loginInfo] = useLoginInfo();
const operateInfo = ref({});
const uploadData = ref({
  action: `${baseURL}/operate/BusOperateServe/updateLogoUrl`,
  headers: { "xbb-ssh": loginInfo.value.token },
  onSuccess(res) {
    operateInfo.value.logoUrl = res.t;
  },
  onError(...args) {
    console.log("error", args);
  },
});
const editForm = ref({
  visible: false,
  value: "",
  password: "",
  label: "",
  key: "",
  type: 1, // 1:input 2:textarea 3:checkbox
});
const formRule = computed(() => {
  return {
    value: [{ required: true, trigger: "blur", message: `Please enter ${editForm.value.label}.` }],
    password: [{ required: true, trigger: "blur", message: "Please enter execution password." }],
  };
});

const getDetail = () => {
  http.get("/operate/BusOperateAccountServe/getOneBusOperate").then((res) => {
    operateInfo.value = res.t;
  });
};
getDetail();

const edit = (type, key, label) => {
  let value = cloneDeep(operateInfo.value[key]);

  editForm.value = {
    visible: true,
    value,
    password: "",
    label,
    key,
    type,
  };
};
const save = () => {
  let { key, value, password, type } = editForm.value;
  if (type === 3) {
    value = parseInt(
      value
        .map((o) => o.pick)
        .reverse()
        .join(""),
      2
    );
  }

  http
    .post("/operate/BusOperateServe/updateCompanyInfo", {
      [key]: value,
      exPassword: password,
    })
    .then((res) => {
      ElMessage.success("Saved successfully!");
      getDetail();
      editForm.value.visible = false;
    });
};
const cancel = () => {
  editForm.value.visible = false;
};
</script>

<style lang="scss" scoped>
.sub-title {
  line-height: 64px;
  font-size: 20px;
  font-weight: bolder;
}

.logo-pic {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
  line-height: 1.2;

  > div:first-child {
    padding: 12px 0;
  }

  label {
    margin-right: 30px;

    & + * {
      color: #999;
    }
  }
}

.dash-border {
  border-bottom: 1px dashed #999;
}

.el-form-item.no-flex {
  display: inherit;
}

.intro-box {
  width: 50%;
}

.amenities-box {
  border: 1px solid;
  padding: 10px;

  :deep(.el-checkbox) {
    height: 20px;
    line-height: 20px;
  }
}
</style>
