/*
 * @Description: 动态路由
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:50:56
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-12 14:59:21
 */
import { RouteRecordRaw } from 'vue-router';
import { ElLoading } from 'element-plus';
import { systemService } from '@/services';
import { TComponent } from '#/vue-router';

/**
 * 标准化动态路由 [import.meta.glob]
 */
export const normalizeaRoutesUseGlob = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const components: TComponent = getViewComponent();
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
export const getViewComponent = (): TComponent => {
  const modules = import.meta.glob('../views/**/*.vue');
  const COMPONENTS_KEY = 'components'; // 过滤views文件下components命名的文件夹
  const BEFOREFIX = '../';
  const AFTERFIX = '.vue';
  const components: TComponent = {};

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
  } catch (error) {
    return [];
  }
};
