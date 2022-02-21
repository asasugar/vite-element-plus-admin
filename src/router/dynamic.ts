/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-21 19:09:33
 */

import { ElLoading } from 'element-plus';
import { systemService } from '@/services';
import { dynamicImport } from '@/utils';
import { IRoutes } from './types';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 标准化动态路由
 */

const normalizeaRoutes = (routes: IRoutes[] | RouteRecordRaw[]) => {
  return routes.map(item => {
    if (item.path && item.component) {
      if (typeof item.component === 'string') {
        item.component = dynamicImport(item.component);
      }
    }
    if (item?.children?.length) {
      normalizeaRoutes(item.children);
    }
    return item;
  });
};

/**
 * 注册路由
 * 用户切换账号需移除 sessionStorage 中的 routerMap 数据
 */
export const registerDynamicRoutes = async () => {
  try {
    const loading = ElLoading.service();
    // mockjs模拟后端请求数据
    const routes = await systemService.getRoute();
    loading.close();
    return normalizeaRoutes(routes);
  } catch (error) {
    return [];
  }
};
