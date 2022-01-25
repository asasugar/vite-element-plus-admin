/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:12:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 14:32:50
 */

import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import { clearToken, getToken } from '@/utils/token';

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
      // 到登录页，重置token凭证
      clearToken();
      next({ name: 'Login' });
    } else next();
  }
);
export default router;
