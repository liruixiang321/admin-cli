export default {
  name: 'Layout',
  path: '/',
  redirect: '/home',
  component: () => import('@/layout/index.vue'),
  meta: {},
  children: [
    {
      path: '/home',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '项目介绍',
        icon: 'home',
        isShow: true,
      },
    },
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'user',
        isShow: true,
      },
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('@/views/auth/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'auth',
        isShow: true,
      },
    },
  ],
};
