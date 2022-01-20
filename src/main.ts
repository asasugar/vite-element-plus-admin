import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { setupGlobDirectives } from '@/directives';
import '@/style/common.less';
import { mockXHR } from '../mock';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';

mockXHR(); // mock接口
const app = createApp(App);
setupGlobDirectives(app); // 注册自定义指令
app.use(router).use(store).mount('#app');
