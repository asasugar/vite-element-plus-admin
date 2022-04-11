/*
 * @Description: 用户接口【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-11 17:15:08
 */
import * as Mock from 'mockjs';
import { IConfig, IUserType } from '../../typing';
import type { IUserInfo } from '#/store';
const Random = Mock.Random;

Random.extend({
  prole: function () {
    const hashMap = [
      { key: 'superAdmin', value: '超级管理员' },
      { key: 'admin', value: '管理员' },
      { key: 'operation', value: '运营人员' },
      { key: 'test', value: '测试人员' },
      { key: 'development', value: '研发人员' },
      { key: 'boss', value: '老板' }
    ];
    return this.pick(hashMap);
  }
});

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
  },
  // 获取角色列表
  {
    url: 'user/getRoleList',
    type: 'get',
    response: (config: IConfig) => {
      const { pageNum, pageSize } = config.body;
      const total = 200;

      const { list } = Mock.mock({
        [`list|${total}`]: [
          {
            'sortId|+1': 1,
            status: Random.boolean(),
            role: '@prole',
            createTime: Random.datetime(),
            remark: Random.city()
          }
        ]
      });
      const newDataList =
        pageSize > 1 ? list.slice((pageNum - 1) * pageSize, pageNum * pageSize) : [...list];
      if (pageNum && pageSize) {
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            content: newDataList,
            total
          },
          code: 200
        };
      } else {
        return {
          success: true,
          result: {
            pageNum: 1,
            pageSize: total,
            content: list,
            total
          },
          code: 200
        };
      }
    }
  },
  // 获取用户列表
  {
    url: 'user/getUserList',
    type: 'get',
    response: (config: IConfig) => {
      const { pageNum, pageSize } = config.body;
      const total = 200;

      const { list } = Mock.mock({
        [`list|${total}`]: [
          {
            'id|+1': 1,
            userName: '@name',
            email: '@email',
            role: '@prole',
            createTime: Random.datetime()
          }
        ]
      });
      const newDataList =
        pageSize > 1 ? list.slice((pageNum - 1) * pageSize, pageNum * pageSize) : [...list];
      if (pageNum && pageSize) {
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            content: newDataList,
            total
          },
          code: 200
        };
      } else {
        return {
          success: true,
          result: {
            pageNum: 1,
            pageSize: total,
            content: list,
            total
          },
          code: 200
        };
      }
    }
  }
];
