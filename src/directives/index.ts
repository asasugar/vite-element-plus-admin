/*
 * @Description: 自定义指令
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-23 10:23:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-21 19:10:52
 */
import { App } from 'vue';
import { setupFixedDirective } from './fixed';

export function setupGlobDirectives(app: App<Element>) {
  setupFixedDirective(app);
}
