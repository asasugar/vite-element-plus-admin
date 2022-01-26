/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:12:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-26 18:22:51
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

// 基础路由
const routes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
];

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: routes as RouteRecordRaw[]
});

// 路由守卫
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = `${to.meta.title} - Vite App`;
    if (to.name !== 'Login' && !getToken()) {
      // 到登录页，重置token凭证, 清除session里的动态路由
      clearToken();
      removeSession('routerMap');
      next({ name: 'Login' });
    } else next();
  }
);
export default router;
