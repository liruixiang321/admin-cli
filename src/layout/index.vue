<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1">
          <el-menu-item index="1">项目介绍</el-menu-item>
          <el-menu-item index="2">项目文档</el-menu-item>
          <el-menu-item index="3">项目源码</el-menu-item>
          <el-menu-item index="4">项目交流</el-menu-item>
          <el-menu-item index="5">项目联系</el-menu-item>
          <el-menu-item index="6">项目日志</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import Header from './components/header.vue';
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
</style>
