/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 20:04:16
 */

import router from '@/router';
import { setSession, getSession } from '@/utils/session';
import { ElLoading } from 'element-plus';
import { systemService } from '@/services';

const importLocale = (view: string) => {
  console.log(11, view);

  return () => import(`../views/${view}/index.vue`);
};
/**
 * 注册路由
 * 用户切换账号需移除 sessionStorage 中的 routerMap 数据
 */
export const registerRoutes = (): Promise<boolean> => {
  const routerMap = getSession('routerMap');

  return new Promise((resolve, reject) => {
    // 添加404页面
    router.addRoute({
      path: '/:catchAll(.*)',
      redirect: '/404',
      name: 'NotFound'
    });

    if (routerMap?.length) {
      addRoutes(routerMap);
      resolve(true);
    } else {
      const loading = ElLoading.service();
      // 模拟后端请求数据
      window.setTimeout(() => {
        loading.close();
        const result = [
          {
            path: '/product',
            name: 'Product',
            component: 'layouts/page/index.vue',
            meta: {
              title: '商品管理'
            },
            children: [
              {
                path: 'index',
                name: 'ProductIndex',
                component: 'views/product/product-index.vue',
                meta: {
                  title: '商品列表',
                  auth: ['delete']
                }
              },
              {
                path: 'detail',
                name: 'ProductDetail',
                component: 'views/product/product-detail.vue',
                meta: {
                  title: '商品详情',
                  auth: ['upload']
                }
              }
            ]
          },
          {
            path: '/admin',
            name: 'Admin',
            component: 'layouts/page/index.vue',
            meta: {
              title: '系统管理'
            },
            children: [
              {
                path: 'index',
                name: 'AdminIndex',
                component: 'views/admin/admin-index.vue',
                meta: {
                  title: '管理员列表',
                  auth: ['delete', 'audit']
                }
              },
              {
                path: 'edit',
                name: 'AdminEdit',
                component: 'views/admin/admin-edit.vue',
                meta: {
                  hidden: true,
                  title: '管理员编辑',
                  auth: ['add', 'edit']
                }
              },
              {
                path: 'role',
                name: 'AdminRole',
                component: 'views/admin/admin-role.vue',
                meta: {
                  title: '管理员角色'
                }
              }
            ]
          }
        ];
        setSession('routerMap', result as never);
        addRoutes(result);
        resolve(true);
      }, 1000);
    }
  });
};

/**
 * 动态添加路由
 */
const addRoutes = (routes: any, parentName = ''): void => {
  routes.forEach(
    (item: {
      path: any;
      component: string;
      redirect: any;
      name: string | undefined;
      meta: any;
      children: any[];
    }) => {
      if (item.path && item.component) {
        const componentString = item.component.replace(/^\/+/, ''), // 过滤字符串前面所有 '/' 字符
          componentPath = componentString.replace(/\.\w+$/, ''); // 过滤掉后缀名，为了让 import 加入 .vue ，不然会有警告提示...

        const route = {
          path: item.path,
          redirect: item.redirect,
          name: item.name,
          component: () => import('@/' + componentPath + '.vue'),
          meta: item.meta
        };

        parentName ? router.addRoute(parentName, route) : router.addRoute(route);

        if (item.children && item.children.length) {
          addRoutes(item.children, item.name);
        }
      }
    }
  );
};

/**
 * 生成管理菜单
 */
export const getAuthMenu = () => {
  // 这里就根据路由生成后台左侧菜单
  const routerMap = getSession('routerMap');
};
