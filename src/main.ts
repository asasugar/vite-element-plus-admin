import { createApp } from 'vue';
import App from '@/App.vue';
import { setupRouter } from '@/router';
import { setupStore, store } from '@/store';
import { setupGlobDirectives } from '@/directives';
import '@/style/common.less';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
import SDK from '@/services';

const app = createApp(App);

setupGlobDirectives(app); // 注册自定义指令
setupRouter(app); // 注册路由（静态+动态）
setupStore(app); // 注册Vuex

const { user } = await SDK.init();
if (user) {
  // 刷新时初始化存储用户信息至store
  store.dispatch('user/asyncSetUserinfo', user);
}

app.mount('#app');
