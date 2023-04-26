import { RouteRecordRaw } from 'vue-router';

export default defineStore('globalStore', () => {
  const keepAliveInclude = ref<string[]>([]);

  function keepAliveAction(routes: RouteRecordRaw[]) {
    // keep-alive Home下的带有{ meta: { keepAlive: true } }的路由
    keepAliveInclude.value.length = 0;
    const homeRoute = routes?.find(i => i.name === 'Home');
    if (homeRoute) {
      const dg = (routes: RouteRecordRaw) => {
        if (routes?.meta?.keepAlive && routes.name) {
          keepAliveInclude.value.push(routes.name as string);
        }

        routes.children?.forEach(i => dg(i));
      };
      dg(homeRoute);
    }
  }
  return { keepAliveInclude, keepAliveAction };
});
