import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { setupGlobDirectives } from '@/directives';
import '@/style/common.less';
import { mockXHR } from '../mock';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
import { registerDynamicRoutes } from '@/router/dynamic';
import SDK from '@/services';

mockXHR(); // mock接口
await registerDynamicRoutes(); // 初始化/刷新的时候注册动态路由
const app = createApp(App);
setupGlobDirectives(app); // 注册自定义指令

const { user } = await SDK.init();
if (user) {
  // 刷新时初始化存储用户信息至store
  store.dispatch('user/asyncSetUserinfo', user);
}

app.use(router).use(store).mount('#app');
