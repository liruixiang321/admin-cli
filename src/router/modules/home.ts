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
      path: '/mutiRouter',
      name: 'mutiRouter',
      meta: {
        title: '多级路由',
        icon: 'mutiRouter',
        isShow: true,
      },
      children: [
        {
          path: '/mutiRouter/router1',
          name: 'router1',
          meta: {
            title: '路由1',
            isShow: true,
          },
        },
        {
          path: '/mutiRouter/router2',
          name: 'router2',
          meta: {
            title: '路由2',
            isShow: true,
          },
          children: [
            {
              path: '/mutiRouter/router2/child1',
              name: 'router2-1',
              meta: {
                title: '子路由2-1',
                isShow: true,
              },
            },
          ],
        },
      ],
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
      path: '/role',
      name: 'RolePage',
      component: () => import('@/views/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'role',
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
    {
      path: '/example',
      name: 'ExamplePage',
      meta: {
        title: '组件实例',
        icon: 'auth',
        isShow: true,
      },
      children: [
        {
          path: '/example/button',
          name: 'ButtonPage',
          component: () => import('@/views/example/ElMessage.vue'),
          meta: {
            title: '按钮',
            icon: 'auth',
            isShow: true,
          },
        },
        {
          path: '/example/PdfViewer',
          name: 'PdfViewer',
          component: () => import('@/views/example/PdfView.vue'),
          meta: {
            title: 'pdf预览',
            icon: 'auth',
            isShow: true,
          },
        },
        {
          path: '/example/PdfJSViewer',
          name: 'PdfJSViewer',
          component: () => import('@/views/example/PdfJSView.vue'),
          meta: {
            title: 'pdfJS实现预览',
            icon: 'auth',
            isShow: true,
          },
        },
      ],
    },
  ],
};
