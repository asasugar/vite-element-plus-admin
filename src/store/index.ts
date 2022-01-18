/*
 * @Description: vuex状态管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-18 20:16:36
 */
import { createStore } from 'vuex';
import global from './modules/global';
const handleStore = (store: {
  replaceState: (arg0: object) => void;
  subscribe: (arg0: (mutation: any, state: any) => void) => void;
}) => {
  console.log(store);
  // 当 store 初始化后调用
  if (window.localStorage.StoreDefaults)
    store.replaceState(JSON.parse(window.localStorage.StoreDefaults));

  // 每次 mutation 之后调用
  store.subscribe((mutation, state) => {
    if (mutation.type === 'RESET') {
      // 重置时，重新初始化store
      window.localStorage.clear();
    }
  });
};

const store = createStore({
  // 开发环境开启严格模式，在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  strict: import.meta.env.NODE_ENV !== 'production',
  mutations: {
    RESET(state) {}
  },
  actions: {
    reset({ commit }) {
      commit('RESET');
    }
  },
  modules: {
    global
  },
  plugins: [handleStore]
});

export default store;
