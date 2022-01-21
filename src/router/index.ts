/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:12:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 19:36:12
 */

import { DefineComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { setToken, clearToken, getToken } from '@/utils/token';

interface Routers {
  name?: string;
  path: string;
  children?: Array<Routers>;
  component: DefineComponent | (() => void);
}

const routes: Routers[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
  },
  {
    name: 'Home',
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/index.vue'),
    children: [
      {
        name: 'DashboardAnalysis',
        path: '/dashboard/analysis',
        component: () =>
          import(
            /* webpackChunkName: "DashboardAnalysis" */ '../views/dashboard/analysis/index.vue'
          )
      }
    ]
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/error/error-404.vue')
  }
];
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: routes as RouteRecordRaw[]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !getToken()) {
    // 到登录页，重置token凭证
    clearToken();
    next({ name: 'Login' });
  } else next();
});
export default router;
