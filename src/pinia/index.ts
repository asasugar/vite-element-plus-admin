/*
 * @Description: pinia注册
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-01 10:45:12
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-01 11:10:37
 */

import { App } from 'vue';
import { createPinia } from 'pinia';
import useGlobalStore from './modules/global';
import useUserStore from './modules/user';
import useRoleStore from './modules/role';

export const pinia = createPinia();

export function setupPinia(app: App<Element>) {
  app.use(pinia);
}

export { useGlobalStore, useUserStore, useRoleStore };
