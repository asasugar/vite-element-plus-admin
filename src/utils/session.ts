/*
 * @Description: session管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:53:32
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 15:29:55
 */
import { isValidMap } from './is';

export function setSession(key: string, value: any) {
  if (isValidMap(value)) {
    const str = JSON.stringify(value); //把对象转化为字符串
    window.sessionStorage.setItem(key, str);
  } else {
    window.sessionStorage.setItem(key, value);
  }
}

export function getSession(key: string) {
  const value = window.sessionStorage.getItem(key);
  return value ? JSON.parse(value) : value;
}
export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearSession() {
  window.sessionStorage.clear();
}
