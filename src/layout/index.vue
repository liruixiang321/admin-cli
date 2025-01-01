<template>
  <el-container style="height: 100vh">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
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
        </el-scrollbar>
      </el-aside>

      <el-main>
        <el-scrollbar>
          <el-breadcrumb class="bread" :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in routerStore.breadcrumb">{{
              item.meta.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
  import Header from './components/Header.vue';
  import { ArrowRight } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  import { filterMenu } from '@/utils/filterMenu';
  import { useRouteStoreHooks } from '../store/modules/router/index';
  const routerStore = useRouteStoreHooks();
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

  const activePath = route.path;
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    .el-header {
      height: 6.4vh;
    }
    .el-aside {
      height: 93.6vh;
    }
    .el-menu {
      height: 100%;
    }
    .bread {
      margin-bottom: 20px;
    }
    .el-main {
      height: 93.6vh;
    }
  }
</style>
