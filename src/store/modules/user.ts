/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 11:21:04
 */
interface IUserState {
  userinfo?: object;
}

interface IContent {
  commit: (arg0: string, arg1: any) => void;
}

const user = {
  namespaced: true,
  state: {
    userinfo: {}
  },
  mutations: {
    setUserinfo(state: IUserState, value?: object) {
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
