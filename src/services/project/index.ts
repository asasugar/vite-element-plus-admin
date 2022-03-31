/*
 * @Description: 项目管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 10:14:53
 */
import { apiGetProjectList, apiGetRepositoryList } from '@/apis/project';
class ProjectService {
  /**
   * 看板数据
   * @param data
   * @returns {Object}
   */
  async getProjectList<T>(data: T) {
    const { success, result } = await apiGetProjectList(data);
    if (success) return result;
    return null;
  }
  /**
   * github repository 数据
   * @param data
   * @returns {Object}
   */
  async getRepositoryList<T>(data: T) {
    const { success, result } = await apiGetRepositoryList(data);
    if (success) return result;
    return null;
  }
}

export default new ProjectService();
