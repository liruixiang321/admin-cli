<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activePath" router>
          <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">{{
            item.meta.title
          }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import Header from './components/Header.vue';

  const router = useRouter();
  const route = useRoute();

  const menuList = router.getRoutes().filter((route) => route.meta.isShow);

  const activePath = route.path;
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
</style>
