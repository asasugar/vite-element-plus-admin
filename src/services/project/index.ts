/*
 * @Description: 项目管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-18 10:21:07
 */
import request from '@/utils/request';

class ProjectService {
  /**
   * 看板数据
   * @param data
   * @returns {Object}
   */
  async getProjectList(data: object) {
    const { success, result } = await request.get('/project/getProjectList', { data });
    if (success) return result;
    return null;
  }
  /**
   * github repository 数据
   * @param data
   * @returns {Object}
   */
  async getRepositoryList(data: object) {
    const { success, result } = await request.get('/project/getRepositoryList', { data });
    if (success) return result;
    return null;
  }
}

export default new ProjectService();
