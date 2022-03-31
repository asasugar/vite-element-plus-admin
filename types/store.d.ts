/*
 * @Description: 状态管理声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:39
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 11:21:10
 */
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number;
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}


export interface IContent {
  commit: (arg0: string, arg1: any) => void;
}

export interface IUserInfo {
  token: string;
  password?: number | string;
  username?: string;
  avatar?: string;
}
