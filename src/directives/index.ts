/*
 * @Description: 自定义指令
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-23 10:23:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-18 11:37:10
 */
import { setupFixedDirective } from './fixed';

export function setupGlobDirectives (app: { directive: (arg0: string, arg1: (el: any, binding: any) => void) => void; }) {
  setupFixedDirective(app)
}