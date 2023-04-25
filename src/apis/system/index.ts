import inject from '../inject';
import type {
  ApiGetAnalysisDataRes,
  ApiGetRouteRes,
  ApiGetMenuRes,
  ApiGetQuickNavRes,
  ApiGetLatestNewsRes
} from './typing';
// 看板数据接口
export const apiGetAnalysis = inject<ApiGetAnalysisDataRes>('/sys/getAnalysis', 'get');

// 获取前端动态路由配置接口
export const apiGetRoute = inject<ApiGetRouteRes>('/sys/getRoute');

// 获取菜单页配置接口
export const apiGetMenu = inject<ApiGetMenuRes>('/sys/getMenu', 'get');

// 获取快捷导航列表接口
export const apiGetQuickNavList = inject<ApiGetQuickNavRes>('/sys/getQuickNavList', 'get');

// 获取最新动态接口
export const apiGetLatestNews = inject<ApiGetLatestNewsRes>('/sys/getLatestNews', 'get');
