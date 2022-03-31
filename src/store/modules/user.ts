/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 11:41:09
 */
import type { IContent, IUserInfo } from '#/store';

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
    asyncSetUserinfo(content: IContent<IUserInfo>, value: IUserInfo) {
      content.commit('setUserinfo', value);
    }
  }
};

export default user;
