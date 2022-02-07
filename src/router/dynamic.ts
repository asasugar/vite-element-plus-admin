/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 18:31:14
 */

import router from '@/router';
import { setSession, getSession } from '@/utils/session';
import { ElLoading } from 'element-plus';
import { systemService } from '@/services';
import { dynamicImport } from '@/utils';
import { IRoutes } from './types';

/**
 * 注册路由
 * 用户切换账号需移除 sessionStorage 中的 routerMap 数据
 */
export const registerDynamicRoutes = async () => {
  const routerMap = getSession('routerMap');

  if (routerMap?.length) {
    addRoutes(routerMap);
    return true;
  } else {
    const loading = ElLoading.service();
    // 模拟后端请求数据
    const routes = await systemService.getRoute();
    loading.close();
    setSession('routerMap', routes);
    addRoutes(routes);
    return true;
  }
};

/**
 * 动态添加路由
 */
const addRoutes = (routes: IRoutes[], parentName = ''): void => {
  routes.forEach(item => {
    if (item.name && router.hasRoute(item.name)) return; // 如果存在指定名称的路由则不重新添加

    if (item.path && item.component) {
      const route = {
        path: item.path,
        redirect: item.redirect,
        name: item.name,
        component: dynamicImport(item.component),
        meta: item.meta
      };

      parentName ? router.addRoute(parentName, route) : router.addRoute(route);
      if (item.children && item.children.length) {
        addRoutes(item.children, item.name);
      }
    }
  });

  // 路由的最后添加404
  if (!router.hasRoute('NotFound')) {
    router.addRoute({
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/error/error-404.vue')
    });
  }
};
