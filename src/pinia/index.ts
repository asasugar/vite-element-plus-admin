/*
 * @Description: pinia注册
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-01 10:45:12
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 11:55:32
 */

import { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import useGlobalStore from './modules/global';
import useUserStore from './modules/user';
import useRoleStore from './modules/role';

export const pinia = createPinia();
export function setupPinia(app: App<Element>) {
  pinia.use(
    createPersistedState({
      key: id => `__persisted__${id}`
    })
  );

  // To fixed store.$reset() unwork in setup!
  pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
      store.$state = JSON.parse(JSON.stringify(initialState));
    };
  });
  app.use(pinia);
}

export { useGlobalStore, useUserStore, useRoleStore };
