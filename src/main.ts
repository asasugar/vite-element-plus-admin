import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupGlobDirectives } from './directives'
import './style/default.css'

const app = createApp(App);
setupGlobDirectives(app) // 注册自定义指令
app.use(router).mount('#app')
