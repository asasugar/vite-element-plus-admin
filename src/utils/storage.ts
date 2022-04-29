/*
 * @Description: storage管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:53:32
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 15:30:00
 */
import { isValidMap } from './is';

export function setStorage(key: string, value: any) {
  if (isValidMap(value)) {
    const str = JSON.stringify(value); //把对象转化为字符串
    window.localStorage.setItem(key, str);
  } else {
    window.localStorage.setItem(key, value);
  }
}

export function getStorage(key: string) {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : value;
}
export function removeStorage(key: string) {
  window.localStorage.removeItem(key);
}

export function clearStorage() {
  window.localStorage.clear();
}
