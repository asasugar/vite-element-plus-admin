/*
 * @Description: toten管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 18:30:12
 */

export function setToken(token: string) {
  window.localStorage.setItem('token', token);
}

export function getToken() {
  return window.localStorage.getItem('token') ?? null;
}
export function clearToken() {
  window.localStorage.removeItem('token');
}
