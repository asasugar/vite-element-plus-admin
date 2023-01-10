import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import type { GlobalState } from './typing';

const useGlobalStore = defineStore({
  id: 'global', // id必填，且需要唯一
  state: (): GlobalState => {
    return {
      keepAliveInclude: []
    };
  },
  actions: {
    keepAliveAction(routes: RouteRecordRaw[]) {
      // keep-alive Home下的带有{ meta: { keepAlive: true } }的路由
      this.keepAliveInclude.length = 0;
      const homeRoute = routes?.find(i => i.name === 'Home');
      if (homeRoute) {
        const dg = (routes: RouteRecordRaw) => {
          if (routes?.meta?.keepAlive && routes.name) {
            this.keepAliveInclude.push(routes.name as string);
          }

          routes.children?.forEach(i => dg(i));
        };
        dg(homeRoute);
      }
    }
  }
});

export default useGlobalStore;
