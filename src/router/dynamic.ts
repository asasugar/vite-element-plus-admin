/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-08 16:49:37
 */

import { ElLoading } from 'element-plus';
import { systemService } from '@/services';
import { dynamicImport } from '@/utils';
import { IRoutes } from './types';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 标准化动态路由[已弃用！！]
 */
// dev可用，build之后报错（Error: Unknown variable dynamic import），改用import.meta.glob的方式
export const normalizeaRoutes = (routes: IRoutes[] | RouteRecordRaw[]) => {
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
 * 标准化动态路由 [import.meta.glob]
 */
export const normalizeaRoutesUseGlob = (routes: IRoutes[] | RouteRecordRaw[]) => {
  const components = getViewComponent();
  return routes.map(item => {
    if (item.path && item.component) {
      if (typeof item.component === 'string') {
        item.component = components[item.component];
      }
    }
    if (item?.children?.length) {
      normalizeaRoutesUseGlob(item.children);
    }
    return item;
  });
};
export const getViewComponent = () => {
  const modules = import.meta.glob('../views/**/*.vue');
  const COMPONENTS_KEY = 'components'; // 过滤views文件下components命名的文件夹
  const BEFOREFIX = '../';
  const AFTERFIX = '.vue';
  const components: any = {};

  const viewKeys = Object.keys(modules).filter(key => !key.includes(COMPONENTS_KEY));
  viewKeys.forEach(key => {
    const routeKey = key.replace(BEFOREFIX, '').replace(AFTERFIX, '');
    components[routeKey] = modules[key];
  });
  return components;
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
    return normalizeaRoutesUseGlob(routes);
    // return normalizeaRoutes(routes);
  } catch (error) {
    return [];
  }
};
