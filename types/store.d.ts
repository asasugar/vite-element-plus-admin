/*
 * @Description: 状态管理声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:39
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-01 11:42:16
 */
export interface IUserInfo {
  token: string;
  password?: number | string;
  username?: string;
  avatar?: string;
}
