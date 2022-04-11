/*
 * @Description: 用户管理【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-11 17:28:57
 */
import { getToken } from '@/utils/token';

import {
  apiLogin,
  apiLogout,
  apiGetBaseUserInfo,
  apiGetRoleList,
  apiGetUserList
} from '@/apis/user';
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
    const { success, result } = await apiLogin(data, {
      cache: true
    });
    if (success) return result;
    return null;
  }
  /**
   * 注销
   * @returns {Boolean}
   */
  async logoutAction() {
    const { success, result } = await apiLogout();
    if (success) return result;
    return null;
  }
  /**
   * 获取用户信息
   * @returns {Boolean}
   */
  async getBaseUserInfo() {
    const { success, result } = await apiGetBaseUserInfo({
      token: getToken()
    });
    if (success) return result;
    return null;
  }
  /**
   * 获取角色列表
   * @param data
   * @returns {Array}
   */
  async getRoleList<T>(data: T) {
    const { success, result } = await apiGetRoleList(data);
    if (success) return result;
    return null;
  }
  /**
   * 获取用户列表
   * @param data
   * @returns {Array}
   */
  async getUserList<T>(data: T) {
    const { success, result } = await apiGetUserList(data);
    if (success) return result;
    return null;
  }
}

export default new UserService();
