<template>
  <el-container>
    <el-aside class="aside">
      <AsideBar></AsideBar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <HeaderBar></HeaderBar>
      </el-header>
      <el-main class="main">
        <div class="container" id="main">
          <div class="breadcrumb-bar">
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item v-for="item in routes" :key="item.path" :to="{ path: item.path }">{{
                item.meta.title
              }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-link type="primary" class="back-btn" v-if="routes.length > 2" @click="router.back()">Back</el-link>
          </div>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import HeaderBar from "./HeaderBar.vue";
import AsideBar from "./AsideBar.vue";

const route = useRoute();
const router = useRouter();
const routes = computed(() => route.matched.filter((o) => !!o.meta?.title));
</script>

<style lang="scss" scoped>
.aside {
  background: #001529;
}

.header {
  background: #fff;
}

.main {
  background: #f0f2f5;
  padding: 20px;

  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    overflow-y: auto;

    .breadcrumb-bar {
      position: relative;

      .breadcrumb {
        line-height: 1;
        border-bottom: 1px solid #d7d7d7;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }

      .back-btn {
        padding: 0;
        min-height: inherit;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
