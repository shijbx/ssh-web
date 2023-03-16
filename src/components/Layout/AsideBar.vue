<template>
  <div>
    <div class="logo">
      <h1>  </h1>
      <h1>  </h1>
      <h1>  </h1>
<!--      <img src="/src/assets/logo.png" alt="" />-->
    </div>

    <el-menu
      active-text-color="#ffd04b"
      background-color="#001529"
      class="el-menu-vertical-demo"
      text-color="#fff"
      router
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
    >
      <template v-for="menu in menuList" :key="menu.path">
        <template v-if="menu.children?.length > 1">
          <el-sub-menu :index="menu.path">
            <template #title>
              <el-icon><component :is="menu.meta.icon"></component></el-icon>
              <span>{{ menu.meta?.title }}</span>
            </template>
            <el-menu-item v-for="subMenu in menu.children" :key="subMenu.path" :index="subMenu.path">
              <el-icon><component :is="subMenu.meta.icon"></component></el-icon>
              <span>{{ subMenu.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else-if="menu.children?.length === 1">
          <el-menu-item :index="menu.children[0].path">
            <template #title>
              <el-icon><component :is="menu.meta.icon"></component></el-icon>
              {{ menu.meta?.title }}
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import homeRoutes from "@/router/routes/homeRoutes";

const route = useRoute();
const menuList = ref([]);
homeRoutes.forEach((route) => {
  if (!route.meta?.notShow) {
    const children = [];
    route.children?.forEach((item) => {
      if (!item.meta?.notShow) {
        children.push(item);
      }
    });

    menuList.value.push({ ...route, children });
  }
});
console.log(homeRoutes)
const defaultActive = computed(() => route.path.split("/").slice(0, 3).join("/"));
const defaultOpeneds = ref([route.matched[0].path]);
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  border-right: 0;
}

.logo {
  // background: #00284d;
  text-align: center;
  padding: 20px 0;
}
</style>
