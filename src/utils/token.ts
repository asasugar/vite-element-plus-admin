/*
 * @Description: toten管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-27 10:54:19
 */

export function setToken(token: string) {
  window.localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return window.localStorage.getItem('token');
}
export function clearToken() {
  window.localStorage.removeItem('token');
}
