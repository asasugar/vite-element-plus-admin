import inject from '../inject';

// 看板数据接口
export const apiGetAnalysis = inject('/sys/getAnalysis', 'get');

// 获取前端动态路由配置接口
export const apiGetRoute = inject('/sys/getRoute');

// 获取菜单页配置接口
export const apiGetMenu = inject('/sys/getMenu', 'get');

// 获取快捷导航列表接口
export const apiGetQuickNavList = inject('/sys/getQuickNavList', 'get');

// 获取最新动态接口
export const apiGetLatestNews = inject('/sys/getLatestNews', 'get');
