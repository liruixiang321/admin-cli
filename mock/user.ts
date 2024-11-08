import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/mock/api/login',
    method: 'post',
    //可以获取到请求的query和body参数
    response: ({ body }) => {
      if (body.username !== body.password) {
        return {
          code: 1,
          msg: '密码错误',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        };
      }

      if (body.username === 'admin') {
        return {
          code: 0,
          msg: '登录成功',
          data: {
            username: body.username,
            roles: ['admin'],
            accessToken: '123456',
          },
        };
      } else {
        return {
          code: 1,
          msg: 'Token失效',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        };
      }
    },
  },
  {
    // 获取用户列表的接口
    url: '/mock/api/getUserList',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '获取成功',
        data: [
          {
            id: 1,
            nickName: '张三',
            userName: '张三',
            roles: [
              {
                role: 1,
                roleName: '管理员',
              },
              {
                role: 2,
                roleName: '普通用户',
              },
            ],
          },
          {
            id: 2,
            nickName: '李四',
            userName: '李四',
            roles: [
              {
                role: 1,
                roleName: '管理员',
              },
            ],
          },
          {
            id: 3,
            nickName: '王五',
            userName: '王五',
            roles: [
              {
                role: 2,
                roleName: '普通用户',
              },
            ],
          },
        ],
      };
    },
  },
] as MockMethod[];
