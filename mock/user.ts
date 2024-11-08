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
] as MockMethod[];
