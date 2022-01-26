/*
 * @Description: 接口服务
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-26 18:21:50
 */
import userService from '@/services/user';
import systemService from '@/services/system';

export { userService, systemService };
export default class SDK {
  static async init() {
    const user = await userService.init();
    return {
      user
    };
  }
}
