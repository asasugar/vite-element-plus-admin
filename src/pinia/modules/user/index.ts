/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-09 19:36:20
 */

import { defineStore } from 'pinia';
import type { UserInfo, UserState } from './typing';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      userinfo: null
    };
  },
  actions: {
    updateUserinfo(userinfo: UserInfo) {
      this.userinfo = userinfo;
    }
  }
});
export default useUserStore;
