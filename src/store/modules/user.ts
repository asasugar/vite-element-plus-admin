/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 14:47:40
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-08 18:34:15
 */
import { IContent } from '../types';
interface IUserState {
  userinfo?: object;
}

const user = {
  namespaced: true,
  state: {
    userinfo: {},
    toDoList: [
      { text: '吃饭', done: true },
      { text: '睡觉', done: true },
      { text: '打保罗', done: false }
    ]
  },
  getters: {
    unDoList(state: { toDoList: any[] }) {
      return state.toDoList.filter(i => !i.done);
    }
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
