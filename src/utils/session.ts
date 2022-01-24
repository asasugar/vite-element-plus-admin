/*
 * @Description: session管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-24 19:53:32
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 19:58:12
 */
export function setSession(key: string, value: string) {
  window.sessionStorage.setItem(key, value);
}

export function getSession(key: string) {
  return window.sessionStorage.getItem(key);
}
export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearSession() {
  window.sessionStorage.clear();
}
