/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 17:22:39
 */
interface UserState {
  userinfo?: object;
}

interface Content {
  commit: (arg0: string, arg1: any) => void;
}

const user = {
  namespaced: true,
  state: {
    userinfo: {}
  },
  mutations: {
    setUserinfo(state: UserState, value?: object) {
      state.userinfo = value;
    }
  },
  actions: {
    /**
     * @description 保存用户信息
     * @author Xiongjie.Xue
     * @date 20/01/2022
     * @param {Content} content
     */
    asyncSetUserinfo(content: Content, value: any) {
      content.commit('setUserinfo', value);
    }
  }
};

export default user;
