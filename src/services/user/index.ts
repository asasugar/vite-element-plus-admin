/*
 * @Description: 用户管理【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-05-06 10:52:55
 */
import { getToken } from '@/utils/token';

import {
  apiLogin,
  apiLogout,
  apiGetBaseUserInfo,
  apiGetRoleList,
  apiGetUserList
} from '@/apis/user';
import type { Page } from '#/global';
import type { ApiLoginData } from '@/apis/user/typing';
class UserService {
  // 初始化返回用户信息
  init() {
    if (getToken()) {
      return this.getBaseUserInfo();
    }
  }
  /**
   * 登录
   * @param {ApiLoginData} data
   * @return {Promise<Nullable<ApiGetBaseUserInfoRes>>}
   */
  async loginAction(data: ApiLoginData) {
    const { success, result } = await apiLogin(data, {
      cache: true
    });
    if (success) return result;
    return null;
  }
  /**
   * 注销
   * @returns {Promise<Nullable<ApiLogoutRes>>}
   */
  async logoutAction() {
    const { success, result } = await apiLogout();

    if (success) return result;
    return null;
  }
  /**
   * 获取用户信息
   * @returns {Promise<AxiosResult<Nullable<ApiGetBaseUserInfoRes>>>}
   */
  async getBaseUserInfo() {
    const token = getToken();
    if (!token) return null;
    const { success, result } = await apiGetBaseUserInfo({
      token
    });

    if (success) return result;
    return null;
  }
  /**
   * 获取角色列表
   * @param {Page} data
   * @returns {Promise<AxiosResult<Nullable<ApiGetRoleListRes>>>}
   */
  async getRoleList(data?: Page) {
    const { success, result } = await apiGetRoleList(data);

    if (success) return result;
    return null;
  }
  /**
   * 获取用户列表
   * @param {Page} data
   * @returns {Promise<AxiosResult<Nullable<ApiGetUserListRes>>>}
   */
  async getUserList(data: Page) {
    const { success, result } = await apiGetUserList(data);

    if (success) return result;
    return null;
  }
}

export default new UserService();
