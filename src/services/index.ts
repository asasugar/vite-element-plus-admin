/*
 * @Description: 接口服务
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 14:00:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 11:41:10
 */
import userService from '@/services/user';
import systemService from '@/services/system';
import projectService from '@/services/project';

export { userService, systemService, projectService };
export default class SDK {
  static async init() {
    const user = await userService.init();
    return {
      user
    };
  }
}
