/*
 * @Description: 系统接口【看板数据】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:49:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 10:19:11
 */
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
                name: 'Dashboard',
                path: '/dashboard',
                component: 'views/routerView/index',
                meta: {
                  title: '看板'
                },
                redirect: '/dashboard/analysis',
                children: [
                  {
                    name: 'DashboardAnalysis',
                    path: 'analysis',
                    component: 'views/dashboard/analysis/index',
                    meta: {
                      title: '分析页'
                    }
                  },
                  {
                    name: 'DashboardWorkspace',
                    path: 'workspace',
                    component: 'views/dashboard/workspace/index',
                    meta: {
                      title: '工作台'
                    }
                  }
                ]
              },
              {
                name: 'Editor',
                path: '/editor',
                component: 'views/routerView/index',
                meta: {
                  title: '编辑器'
                },
                redirect: '/editor/markdown',
                children: [
                  {
                    name: 'EditorMarkdown',
                    path: 'markdown',
                    component: 'views/editor/markdown/index',
                    meta: {
                      title: 'Markdown 演示',
                      keepAlive: true
                    }
                  },
                  {
                    name: 'EditorJSON',
                    path: 'json',
                    component: 'views/editor/json-edit/index',
                    meta: {
                      title: 'JSON编辑器 演示',
                      keepAlive: true
                    }
                  },
                  {
                    name: 'EditorRich',
                    path: 'rich',
                    component: 'views/editor/rich-edit/index',
                    meta: {
                      title: '富文本编辑器 演示',
                      keepAlive: true
                    }
                  }
                ]
              },
              {
                name: 'Threejs',
                path: '/threejs',
                component: 'views/routerView/index',
                meta: {
                  title: 'three.js应用'
                },
                redirect: '/threejs/vrRoom',
                children: [
                  {
                    name: 'ThreejsVrRoom',
                    path: 'vrRoom',
                    component: 'views/threejs/vr-room/index',
                    meta: {
                      title: 'VR看房'
                    }
                  }
                ]
              },
              {
                name: 'Feat',
                path: '/feat',
                component: 'views/routerView/index',
                meta: {
                  title: '功能'
                },
                children: [
                  {
                    name: 'FeatDownload',
                    path: 'download',
                    component: 'views/feat/download/index',
                    meta: {
                      title: '文件下载'
                    }
                  },
                  {
                    name: 'FeatWatermask',
                    path: 'watermask',
                    component: 'views/feat/watermask/index',
                    meta: {
                      title: '水印'
                    }
                  },
                  {
                    name: 'FeatCopy',
                    path: 'copy',
                    component: 'views/feat/copy/index',
                    meta: {
                      title: '剪切板'
                    }
                  },
                  {
                    name: 'FeatExcel',
                    path: 'excel',
                    component: 'views/routerView/index',
                    children: [
                      {
                        name: 'FeatExcelImport',
                        path: 'import',
                        component: 'views/feat/excel/import',
                        meta: {
                          title: 'Excel导入'
                        }
                      },
                      {
                        name: 'FeatExcelExport',
                        path: 'export',
                        component: 'views/feat/excel/export',
                        meta: {
                          title: 'Excel导出'
                        }
                      }
                    ]
                  },
                  {
                    name: 'FeatTeleport',
                    path: 'teleport',
                    component: 'views/feat/teleport/index',
                    meta: {
                      title: 'useTeleport演示'
                    }
                  }
                ]
              },
              {
                name: 'System',
                path: '/system',
                component: 'views/routerView/index',
                meta: {
                  title: '系统管理'
                },
                redirect: '/system/user',
                children: [
                  {
                    name: 'SystemUser',
                    path: 'user',
                    component: 'views/routerView/index',
                    redirect: '/system/user/list',
                    children: [
                      {
                        name: 'SystemUserList',
                        path: 'list',
                        component: 'views/system/user/list',
                        meta: {
                          title: '用户管理'
                        }
                      },
                      {
                        name: 'SystemUserInsert',
                        path: 'insert',
                        component: 'views/system/user/update',
                        meta: {
                          title: '新增用户',
                          keepAlive: true
                        }
                      },
                      {
                        name: 'SystemUserEdit',
                        path: 'edit',
                        component: 'views/system/user/update',
                        meta: {
                          title: '编辑用户',
                          keepAlive: true
                        }
                      }
                    ]
                  },
                  {
                    name: 'SystemRole',
                    path: 'role',
                    component: 'views/routerView/index',
                    redirect: '/system/role/list',
                    children: [
                      {
                        name: 'SystemRoleList',
                        path: 'list',
                        component: 'views/system/role/list',
                        meta: {
                          title: '角色管理'
                        }
                      },
                      {
                        name: 'SystemRoleInsert',
                        path: 'insert',
                        component: 'views/system/role/update',
                        meta: {
                          title: '新增角色',
                          keepAlive: true
                        }
                      },
                      {
                        name: 'SystemRoleEdit',
                        path: 'edit',
                        component: 'views/system/role/update',
                        meta: {
                          title: '编辑角色',
                          keepAlive: true
                        }
                      }
                    ]
                  },
                  {
                    name: 'SystemAuth',
                    path: 'auth',
                    component: 'views/system/auth/index',
                    meta: {
                      title: '权限管理'
                    }
                  },
                  {
                    name: 'SystemPassword',
                    path: 'password',
                    component: 'views/system/password/index',
                    meta: {
                      title: '修改密码'
                    }
                  }
                ]
              },
              {
                name: 'Introduce',
                path: '/introduce',
                component: 'views/routerView/index',
                meta: {
                  title: '介绍'
                },
                children: [
                  {
                    name: 'IntroduceProject',
                    path: 'project',
                    component: 'views/introduce/project/index',
                    meta: {
                      title: '关于项目'
                    }
                  },
                  {
                    name: 'IntroduceSelf',
                    path: 'self',
                    component: 'views/introduce/self/index',
                    meta: {
                      title: '关于我'
                    }
                  }
                ]
              },
              {
                name: 'Fun',
                path: '/fun',
                component: 'views/routerView/index',
                meta: {
                  title: '开心一刻'
                },
                children: [
                  {
                    name: 'FunSheep',
                    path: 'sheep',
                    component: 'views/fun/sheep/index',
                    meta: {
                      title: '🐑了个🐑'
                    }
                  }
                ]
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
            name: 'Editor',
            path: '',
            title: '编辑器演示',
            children: [
              {
                sortId: '2-1',
                name: 'EditorMarkdown',
                path: '/editor/markdown',
                title: 'Markdown 演示'
              },
              {
                sortId: '2-2',
                name: 'EditorJSON',
                path: '/editor/json',
                title: 'JSON编辑器 演示'
              },
              {
                sortId: '2-3',
                name: 'EditorRich',
                path: '/editor/rich',
                title: '富文本编辑器 演示'
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
            name: 'Feat',
            path: '',
            title: '功能',
            children: [
              {
                sortId: '4-1',
                name: 'FeatDownload',
                path: '/feat/download',
                title: '文件下载'
              },
              {
                sortId: '4-2',
                name: 'FeatWatermask',
                path: '/feat/watermask',
                title: '水印'
              },
              {
                sortId: '4-3',
                name: 'FeatCopy',
                path: '/feat/copy',
                title: '剪切板'
              },
              {
                sortId: '4-4',
                name: 'FeatExcel',
                path: '',
                title: 'Excel',
                children: [
                  {
                    sortId: '4-4-1',
                    name: 'FeatExcelImport',
                    path: '/feat/excel/import',
                    title: 'Excel导入'
                  },
                  {
                    sortId: '4-4-2',
                    name: 'FeatExcelExport',
                    path: '/feat/excel/export',
                    title: 'Excel导出'
                  }
                ]
              },
              {
                sortId: '4-5',
                name: 'FeatTeleport',
                path: '/feat/teleport',
                title: 'useTeleport演示'
              }
            ]
          },
          {
            sortId: '5',
            name: 'System',
            path: '',
            title: '系统管理',
            children: [
              {
                sortId: '5-1',
                name: 'SystemUser',
                path: '/system/user',
                title: '用户管理'
              },
              {
                sortId: '5-2',
                name: 'SystemRole',
                path: '/system/role',
                title: '角色管理'
              },
              {
                sortId: '5-3',
                name: 'SystemPassword',
                path: '/system/password',
                title: '修改密码'
              }
            ]
          },
          {
            sortId: '6',
            name: 'Introduce',
            path: '',
            title: '介绍',
            children: [
              {
                sortId: '6-1',
                name: 'IntroduceProject',
                path: '/introduce/project',
                title: '项目介绍'
              },
              {
                sortId: '6-2',
                name: 'IntroduceSelf',
                path: '/introduce/self',
                title: '关于我'
              }
            ]
          },
          {
            sortId: '7',
            name: 'Fun',
            path: '',
            title: '开心一刻',
            children: [
              {
                sortId: '7-1',
                name: 'FunSheep',
                path: '/fun/sheep',
                title: '🐑了个🐑'
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
  }
];
