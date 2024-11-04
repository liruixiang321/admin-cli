import { createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import { createRouter } from "vue-router";
import NProgress from "nprogress";

const routers: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
    meta: {},
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
