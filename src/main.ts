import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupGlobDirectives } from '@/directives';
import { setupPinia, useUserStore } from '@/pinia';
import App from '@/App.vue';
import 'default-passive-events';
import '@/style/common.less';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
import SDK from '@/services';

const app = createApp(App);

setupGlobDirectives(app); // 注册自定义指令
setupRouter(app); // 注册路由（静态+动态）
setupPinia(app); // 注册Pinia

(async () => {
  const { user } = await SDK.init();
  if (user) {
    // 刷新时初始化存储用户信息至pinia
    const useUser = useUserStore();
    useUser.updateUserinfo(user);
  }
})();

app.mount('#app');
