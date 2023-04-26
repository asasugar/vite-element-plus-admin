/*
 * @Description: 用户接口【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 14:04:10
 */
import * as Mock from 'mockjs';
import type { MockConfig, IUserType } from '../../typing';
import type { UserInfo } from '@/pinia/modules/user/typing';

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

const userinfo: UserInfo = {
  token: users['admin'].token,
  username: 'admin',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
};
export default [
  // 登录
  {
    url: 'user/login',
    type: 'post',
    response: (config: MockConfig) => {
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
    response: (config: MockConfig) => {
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
    response: (config: MockConfig) => {
      const total = 200;

      if (!config.body) {
        const { list } = Mock.mock({
          [`list|${total}`]: [
            {
              'id|+1': 1,
              status: Random.boolean(),
              role: '@prole',
              createTime: Random.datetime(),
              remark: Random.city()
            }
          ]
        });
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

      const { pageNum, pageSize } = config.body;

      const { list } = Mock.mock({
        [`list|${pageSize}`]: [
          {
            'id|+1': (pageNum - 1) * pageSize + 1,
            status: Random.boolean(),
            role: '@prole',
            createTime: Random.datetime(),
            remark: Random.city()
          }
        ]
      });
      return {
        success: true,
        result: {
          pageNum,
          pageSize,
          content: list,
          total
        },
        code: 200
      };
    }
  },
  // 获取用户列表
  {
    url: 'user/getUserList',
    type: 'get',
    response: (config: MockConfig) => {
      const { pageNum, pageSize } = config.body;
      const total = 200;
      if (pageNum && pageSize) {
        const { list } = Mock.mock({
          [`list|${pageSize}`]: [
            {
              'id|+1': (pageNum - 1) * pageSize + 1,
              userName: '@name',
              email: '@email',
              role: '@prole',
              createTime: Random.datetime()
            }
          ]
        });
        return {
          success: true,
          result: {
            pageNum,
            pageSize,
            content: list,
            total
          },
          code: 200
        };
      } else {
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
