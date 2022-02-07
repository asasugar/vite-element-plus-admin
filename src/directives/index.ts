/*
 * @Description: 自定义指令
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-23 10:23:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 18:32:57
 */

import { setupFixedDirective } from './fixed';

export function setupGlobDirectives(app: {
  directive: (arg0: string, arg1: (el: any, binding: any) => void) => void;
}) {
  setupFixedDirective(app);
}
