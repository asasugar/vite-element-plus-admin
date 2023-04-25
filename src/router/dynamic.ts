/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 15:53:55
 */
import { systemService } from '@/services';
import { ElLoading } from 'element-plus';
import type { RouteComponent, RouteModules } from '#/vue-router';
import type { RouteInfo, ApiGetRouteRes } from '@/apis/system/typing';

/**
 * 标准化动态路由 [import.meta.glob]
 */
export const normalizeaRoutesUseGlob = (routes: ApiGetRouteRes) => {
  const components: RouteComponent = getViewComponent();
  return routes.map((item: RouteInfo) => {
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
export const getViewComponent = (): RouteComponent => {
  const modules = import.meta.glob('../views/**/*.vue');
  const COMPONENTS_KEY = 'components'; // 过滤views文件下components命名的文件夹
  const BEFOREFIX = '../';
  const AFTERFIX = '.vue';
  const components: RouteComponent = {};

  const viewKeys = Object.keys(modules).filter(key => !key.includes(COMPONENTS_KEY));
  viewKeys.forEach(key => {
    const routeKey = key.replace(BEFOREFIX, '').replace(AFTERFIX, '');
    components[routeKey] = modules[key] as RouteModules;
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
    if (routes) return normalizeaRoutesUseGlob(routes);
  } catch (error) {
    return [];
  }
};
