/*
 * @Description: 装饰器函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-25 14:19:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-25 14:34:35
 */
import { useThrottleFn, useDebounceFn } from '@vueuse/core';

/**
 * @description: 装饰类方法节流
 * @param {*} t
 * @return {*}
 */
export function throttle(t = 0) {
  return function (_target: any, _methodName: any, desc: any) {
    const oldMethod = desc.value;
    desc.value = useThrottleFn(oldMethod, t);
  };
}

/**
 * @description: 装饰类方法防抖
 * @param {*} t
 * @return {*}
 */
export function debounce(t = 0) {
  return function (_target: any, _methodName: any, desc: any) {
    const oldMethod = desc.value;
    desc.value = useDebounceFn(oldMethod, t);
  };
}
