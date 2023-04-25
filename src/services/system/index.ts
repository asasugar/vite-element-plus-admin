/*
 * @Description: 系统管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 18:06:50
 */
import {
  apiGetAnalysis,
  apiGetRoute,
  apiGetMenu,
  apiGetLatestNews,
  apiGetQuickNavList
} from '@/apis/system';
class SystemService {
  /**
   * 看板数据
   * @returns {Promise<AxiosResult<Nullable<ApiGetAnalysisDataRes>>>}
   */
  async getAnalysis() {
    const { success, result } = await apiGetAnalysis();

    if (success) return result;
    return null;
  }
  /**
   * 获取前端动态路由配置
   * @returns {Promise<AxiosResult<Nullable<ApiGetRouteRes[]>>>}
   */
  async getRoute() {
    const { success, result } = await apiGetRoute();

    if (success) return result;
    return null;
  }
  /**
   * 获取菜单页配置
   * @returns {Promise<AxiosResult<Nullable<ApiGetMenuRes>>>}
   */
  async getMenu() {
    const { success, result } = await apiGetMenu();

    if (success) return result;
    return null;
  }
  /**
   * 获取快捷导航列表
   * @returns {Promise<AxiosResult<Nullable<ApiGetQuickNavRes>>>}
   */
  async getQuickNavList() {
    const { success, result } = await apiGetQuickNavList();
    if (success) return result;
    return null;
  }
  /**
   * 获取最新动态
   * @returns {Promise<AxiosResult<Nullable<ApiGetLatestNewsRes>>>}
   */
  async getLatestNews() {
    const { success, result } = await apiGetLatestNews();
    if (success) return result;
    return null;
  }
}

export default new SystemService();
