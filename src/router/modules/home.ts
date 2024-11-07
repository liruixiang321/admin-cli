export default {
  name: 'Layout',
  path: '/',
  redirect: '/home',
  component: () => import('@/layout/index.vue'),
  meta: {},
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
};
