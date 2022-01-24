/*
 * @Description: 用户接口【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 11:19:50
 */

type IUserType = {
  [x: string]: { password: number | string; token: string };
};
interface IConfig {
  body: any;
  method: string;
  url: string;
}
const users: IUserType = {
  admin: {
    password: 123456,
    token: 'admin-token'
  }
};

export default [
  // 登录
  {
    url: 'user/login',
    type: 'post',
    response: (config: IConfig) => {
      const index = Object.keys(users).indexOf(config.body.username);
      if (index !== -1) {
        if (config.body.password == 123456) {
          return {
            success: true,
            result: {
              token: users[config.body.username].token,
              username: config.body.username
            },
            code: 200
          };
        } else {
          return {
            success: false,
            code: 201,
            message: '密码错误'
          };
        }
      } else {
        return {
          success: false,
          code: 201,
          message: '用户名错误'
        };
      }
    }
  },
  // 注销
  {
    url: 'user/logout',
    type: 'post',
    response: () => {
      return {
        success: true,
        code: 200,
        result: {
          msg: '退出成功'
        }
      };
    }
  }
];
