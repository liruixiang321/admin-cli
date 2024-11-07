import { createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { createRouter } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {},
};

const aboutRouter = {
  path: '/about',
  name: 'About',
  component: () => import('@/views/about/index.vue'),
  meta: {},
};

// 文件：/foo/index.js
// const modules = import.meta.glob('../foo/*.js')
// // 转换为：
// const modules = {
// -  '../foo/bar.js': () => {}
// +  './bar.js': () => {}
// }
const modulesRoutes: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true, //懒加载
});

const routers: Array<RouteRecordRaw> = [];

Object.keys(modulesRoutes).forEach((key) => {
  const route = modulesRoutes[key].default;
  routers.push(route);
});
routers.push(rootRouter, aboutRouter);
const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});
const noNeedLoginRoutes = ['/login', '/about'];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userInfo = localStorage.getItem('userInfo');
  const userHasLogin = userInfo ? true : false;
  if (userHasLogin || noNeedLoginRoutes.includes(to.path)) next();
  else next('/login');
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
