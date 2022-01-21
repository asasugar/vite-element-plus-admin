/*
 * @Description: vuex状态管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 17:29:06
 */
import { createStore } from 'vuex';
import global from './modules/global';
import user from './modules/user';

const store = createStore({
  // 开发环境开启严格模式，在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
  strict: import.meta.env.NODE_ENV !== 'production',
  modules: {
    global,
    user
  }
});

export default store;
