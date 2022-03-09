/*
 * @Description: 系统接口【看板数据】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-09 10:05:50
 */
import * as Mock from 'mockjs';
import { IConfig } from '../../types';

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

export default [
  // 看板数据
  {
    url: 'sys/getAnalysis',
    type: 'get',
    response: () => {
      return {
        success: true,
        result: {
          visit: {
            title: '访问数',
            value: 2000,
            total: 120000,
            color: 'green',
            action: '月',
            tagType: 'success'
          },
          total: {
            title: '成交额',
            value: 20000,
            total: 500000,
            color: 'blue',
            action: '月',
            tagType: 'info'
          },
          download: {
            title: '下载数',
            value: 8000,
            total: 120000,
            color: 'orange',
            action: '周',
            tagType: 'danger'
          }
        },
        code: 200
      };
    }
  },
  // 获取前端路由
  {
    url: 'sys/getRoute',
    type: 'post',
    response: () => {
      return {
        success: true,
        result: [
          {
            name: 'Home',
            path: '/',
            component: 'views/home/index',
            meta: {
              title: '首页'
            },
            redirect: '/dashboard/analysis',
            children: [
              {
                name: 'DashboardAnalysis',
                path: '/dashboard/analysis',
                component: 'views/dashboard/analysis/index',
                meta: {
                  title: '分析页'
                }
              },
              {
                name: 'DashboardWorkspace',
                path: '/dashboard/workspace',
                component: 'views/dashboard/workspace/index',
                meta: {
                  title: '工作台'
                }
              },
              {
                name: 'ComponentMarkdown',
                path: '/component/markdown',
                component: 'views/component/markdown/index',
                meta: {
                  title: 'Markdown 演示'
                }
              },
              {
                name: 'ComponentJSON',
                path: '/component/json',
                component: 'views/component/json-edit/index',
                meta: {
                  title: 'JSON编辑器 演示'
                }
              },
              {
                name: 'ThreejsVrRoom',
                path: '/threejs/vrRoom',
                component: 'views/threejs/vr-room/index',
                meta: {
                  title: 'VR看房'
                }
              },
              {
                name: 'SystemUser',
                path: '/system/user',
                component: 'views/system/user/index',
                meta: {
                  title: '用户管理'
                }
              },
              {
                name: 'SystemRole',
                path: '/system/role',
                component: 'views/system/role/index',
                meta: {
                  title: '角色管理'
                },
                children: [
                  {
                    name: 'SystemRoleInsert',
                    path: 'insert',
                    component: 'views/system/role/update',
                    meta: {
                      title: '新增角色'
                    }
                  },
                  {
                    name: 'SystemRoleEdit',
                    path: 'edit',
                    component: 'views/system/role/update',
                    meta: {
                      title: '编辑角色'
                    }
                  }
                ]
              },
              {
                name: 'SystemAuth',
                path: '/system/auth',
                component: 'views/system/auth/index',
                meta: {
                  title: '权限管理'
                }
              }
            ]
          }
        ],
        code: 200
      };
    }
  },
  // 获取菜单列表
  {
    url: 'sys/getMenu',
    type: 'get',
    response: () => {
      return {
        success: true,
        result: [
          {
            sortId: '1',
            name: 'Dashboard',
            path: '',
            title: 'Dashboard',
            children: [
              {
                sortId: '1-1',
                name: 'DashboardAnalysis',
                path: '/dashboard/analysis',
                title: '分析页'
              },
              {
                sortId: '1-2',
                name: 'DashboardWorkspace',
                path: '/dashboard/workspace',
                title: '工作台'
              }
            ]
          },
          {
            sortId: '2',
            name: 'Component',
            path: '',
            title: '组件演示',
            children: [
              {
                sortId: '2-1',
                name: 'ComponentMarkdown',
                path: '/component/markdown',
                title: 'Markdown 演示'
              },
              {
                sortId: '2-2',
                name: 'ComponentJSON',
                path: '/component/json',
                title: 'JSON编辑器 演示'
              }
            ]
          },
          {
            sortId: '3',
            name: 'Threejs',
            path: '',
            title: 'three.js应用',
            children: [
              {
                sortId: '3-1',
                name: 'ThreejsVrRoom',
                path: '/threejs/vrRoom',
                title: 'VR看房'
              }
            ]
          },
          {
            sortId: '4',
            name: 'System',
            path: '',
            title: '系统管理',
            children: [
              {
                sortId: '4-1',
                name: 'SystemUser',
                path: '/system/user',
                title: '用户管理'
              },
              {
                sortId: '4-2',
                name: 'SystemRole',
                path: '/system/role',
                title: '角色管理'
              },
              {
                sortId: '4-3',
                name: 'SystemAuth',
                path: '/system/auth',
                title: '权限管理'
              }
            ]
          }
        ],
        code: 200
      };
    }
  },
  // 获取工作台快捷导航列表
  {
    url: 'sys/getQuickNavList',
    type: 'get',
    response: () => {
      return {
        success: true,
        result: [
          {
            name: 'Home',
            title: '首页',
            path: '/'
          },
          {
            name: 'DashboardAnalysis',
            title: '分析页',
            path: '/dashboard/analysis'
          },
          {
            name: 'DashboardWorkspace',
            title: '工作台',
            path: '/dashboard/workspace'
          },
          {
            name: 'SystemSetting',
            title: '系统设置',
            path: '/system/setting'
          },
          {
            name: 'SystemAuth',
            title: '权限管理',
            path: '/system/auth'
          },
          {
            name: 'SystemUsers',
            title: '用户管理',
            path: '/system/users'
          }
        ],
        code: 200
      };
    }
  },
  // 获取最新动态
  {
    url: 'sys/getLatestNews',
    type: 'get',
    response: () => {
      const listData: Record<string, string>[] = [];

      for (let i = 0; i < 23; i++) {
        listData.push({
          href: 'https://www.antdv.com/',
          title: `ant design vue part ${i}`,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        });
      }
      return {
        success: true,
        result: listData,
        code: 200
      };
    }
  },
  // 获取角色列表
  {
    url: 'sys/getRoleList',
    type: 'get',
    response: (config: IConfig) => {
      const { pageNum, pageSize } = config.body;
      const total = 200;

      const { list } = Mock.mock({
        [`list|${total}`]: [
          {
            role: '@prole',
            'sortId|+1': 1,
            status: Random.boolean(),
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
  }
];
