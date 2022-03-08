/*
 * @Description: 系统管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-08 15:43:06
 */
import request from '@/utils/request';

class SystemService {
  /**
   * 看板数据
   * @param data
   * @returns
   */
  async getAnalysis() {
    const { success, result } = await request.get('/sys/getAnalysis');
    if (success) return result;
    return null;
  }
  /**
   * 获取前端动态路由配置
   * @returns {Array}
   */
  async getRoute() {
    const { success, result } = await request.post('/sys/getRoute');
    if (success) return result;
    return null;
  }
  /**
   * 获取菜单页配置
   * @returns {Array}
   */
  async getMenu() {
    const { success, result } = await request.get('/sys/getMenu');
    if (success) return result;
    return null;
  }
  /**
   * 获取快捷导航列表
   * @returns {Array}
   */
  async getQuickNavList() {
    const { success, result } = await request.get('/sys/getQuickNavList');
    if (success) return result;
    return null;
  }
  /**
   * 获取最新动态
   * @returns {Array}
   */
  async getLatestNews() {
    const { success, result } = await request.get('/sys/getLatestNews');
    if (success) return result;
    return null;
  }
  /**
   * 获取角色列表
   * @param data
   * @returns {Array}
   */
  async getRoleList(data) {
    const { success, result } = await request.get('/sys/getRoleList', { data });
    if (success) return result;
    return null;
  }
}

export default new SystemService();
