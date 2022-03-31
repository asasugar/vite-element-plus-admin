/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 11:23:25
 */
import { IContent } from '../typing';
import type { IUserInfo } from '#/store';

interface UserState {
  userinfo: IUserInfo;
}

const user = {
  namespaced: true,
  state: {
    userinfo: {}
  },
  getters: {},
  mutations: {
    setUserinfo(state: UserState, value: IUserInfo) {
      state.userinfo = value;
    }
  },
  actions: {
    /**
     * @description 保存用户信息
     * @param {IContent} content
     */
    asyncSetUserinfo(content: IContent, value: any) {
      content.commit('setUserinfo', value);
    }
  }
};

export default user;
