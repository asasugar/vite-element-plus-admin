/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:12:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-12 18:07:28
 */

import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import { clearToken, getToken } from '@/utils/token';
import { removeSession } from '@/utils/session';
import { registerDynamicRoutes } from './dynamic';
import { App } from 'vue';
import { mockXHR } from '../../mock';

mockXHR(); // mock接口

// 基础路由
const dynamicRoutes = (await registerDynamicRoutes()) as RouteRecordRaw[];
export const routes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  ...dynamicRoutes,
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/error/error-404.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_REPO_URL), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
});

// 路由守卫
router.beforeEach(
  (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = `${to.meta.title} - Vite App`;
    if (to.name === 'Login') {
      // 到登录页，重置token凭证, 清除session里的动态路由
      clearToken();
      removeSession('routerMap');
    }

    if (to.name !== 'Login' && !getToken()) {
      next({ name: 'Login' });
    } else next();
  }
);

export function setupRouter(app: App<Element>) {
  app.use(router);
}
