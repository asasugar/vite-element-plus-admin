/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:12:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-20 11:25:50
 */

import { DefineComponent } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

interface Routers {
  name?: string;
  path: string;
  component: DefineComponent | (() => void);
}

const routes: Routers[] = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }
];
const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: routes as RouteRecordRaw[]
});

export default router;
