/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-01 11:32:12
 */

import { defineStore } from 'pinia';
import type { IUserInfo } from '#/store';
import type { Nullable } from '#/global';

interface UserState {
  userinfo: Nullable<IUserInfo>;
}
const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      userinfo: null
    };
  },
  actions: {
    updateUserinfo(userinfo: IUserInfo) {
      this.userinfo = userinfo;
    }
  }
});
export default useUserStore;
