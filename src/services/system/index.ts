/*
 * @Description: 系统管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 17:11:53
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
}

export default new SystemService();
