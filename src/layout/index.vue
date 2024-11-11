<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activePath" router>
          <template v-for="item in menuList">
            <el-menu-item v-if="!item.children" :key="item.path" :index="item.path">{{
              item.meta.title
            }}</el-menu-item>
            <el-sub-menu v-else :index="item.path">
              <template #title>
                {{ item.meta.title }}
              </template>
              <el-menu-item
                v-for="twoitem in item.children"
                :index="twoitem.path"
                :key="twoitem.path"
                >{{ twoitem.meta.title }}</el-menu-item
              >
              <!-- 处理多级路由这样的方式不优雅，需要一层一层的写组件，好麻烦 ，正确的方式应该使用tsx来编写递归更优雅一些-->
            </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb class="bread" :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
  import Header from './components/Header.vue';
  import { ArrowRight } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';

  const router = useRouter();
  const route = useRoute();
  //   debugger;
  const MenuRoute = router.options.routes[0];
  let menuList;
  if (MenuRoute == undefined) {
    ElMessageBox.alert('路由配置错误');
  } else {
    menuList = filterMenu(MenuRoute.children as RouteRecordRaw[]);
    console.log(menuList);
  }

  //递归过滤掉meta.isShow为false的路由
  function filterMenu(menu: RouteRecordRaw[]): RouteRecordRaw[] {
    return menu
      .filter((item) => item.meta?.isShow !== false)
      .map((item) => {
        if (item.children && item.children.length > 0) {
          item.children = filterMenu(item.children);
        }
        return item;
      });
  }

  const activePath = route.path;
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    .el-menu {
      height: 100%;
    }
    .bread {
      margin-bottom: 20px;
    }
  }
</style>
