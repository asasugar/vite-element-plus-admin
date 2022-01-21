/*
 * @Description: 用户管理【登录、退出】
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 17:42:31
 */
import request from '@/utils/request';

class UserService {
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
    console.log(1111, success, result);
    if (success) return result;
    return null;
  }
}

export default new UserService();
