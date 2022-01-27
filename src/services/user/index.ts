/*
 * @Description: 用户管理【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-27 10:57:42
 */
import request from '@/utils/request';
import { getToken } from '@/utils/token';
class UserService {
  // 初始化返回用户信息
  init() {
    if (getToken()) {
      return this.getBaseUserInfo();
    }
  }
  /**
   * 登录
   * @param data
   * @returns
   */
  async loginAction(data: object) {
    const { success, result } = await request.post('/user/login', {
      data
    });
    if (success) return result;
    return null;
  }
  /**
   * 注销
   * @returns {Boolean}
   */
  async logoutAction() {
    const { success, result } = await request.post('/user/logout');
    if (success) return result;
    return null;
  }
  /**
   * 获取用户信息
   * @returns {Boolean}
   */
  async getBaseUserInfo() {
    const { success, result } = await request.get('/user/getBaseUserInfo', {
      data: {
        token: getToken()
      }
    });
    if (success) return result;
    return null;
  }
}

export default new UserService();
