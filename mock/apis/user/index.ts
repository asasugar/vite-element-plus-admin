/*
 * @Description: 用户接口【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 14:47:24
 */
import { IConfig, IUserType } from '../../typing';
import type { IUserInfo } from '#/store';

const users: IUserType = {
  admin: {
    password: 123456,
    token: 'admin-token'
  }
};

const userinfo: IUserInfo = {
  token: users['admin'].token,
  username: 'admin',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
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
            result: userinfo,
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
  },
  // 获取用户信息
  {
    url: 'user/getBaseUserInfo',
    type: 'get',
    response: (config: IConfig) => {
      if (config.body) {
        if (config.body.token === userinfo.token) {
          return {
            success: true,
            code: 200,
            result: userinfo
          };
        } else {
          return {
            success: false,
            code: 201,
            message: '未登录或者登录已超时'
          };
        }
      } else {
        return {
          success: false,
          code: 201,
          message: '用户token不能为空'
        };
      }
    }
  }
];
