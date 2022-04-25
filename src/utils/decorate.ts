/*
 * @Description: 装饰器函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-25 14:19:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-25 14:22:21
 */
import { useThrottleFn } from '@vueuse/core';

export function throttle(t = 0) {
  return function (_target: any, _methodName: any, desc: any) {
    const oldMethod = desc.value;
    desc.value = useThrottleFn(oldMethod, t);
  };
}
