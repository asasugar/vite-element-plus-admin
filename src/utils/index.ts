/*
 * @Description: 基础函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 14:36:27
 */

import { TargetContext } from '#/global';

/**
 * @description 判断一个字符串是否为JSON字符串
 * @export
 * @param {string} str
 * @returns {*}  {boolean}
 */
export function isJsonStr(str: string) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
}

/**
 * @description 判断是否对象
 * @export
 * @param {object} [obj]
 * @returns {*}  {boolean}
 */
export function isObject(obj?: object) {
  return typeof obj === 'object' && obj !== null;
}

/**
 * @description 判断是否是复杂类型
 * @export
 * @param {*} map
 * @returns {*}  {boolean}
 */
export function isValidMap(map: any) {
  return Array.isArray(map) || isObject(map);
}

/**
 * @description 动态import
 * @param {string} component
 * @returns {*}
 */
export function dynamicImport(component: string) {
  const componentStr = component.replace(/^\/+/, ''), // 过滤字符串前面所有 '/' 字符
    componentPath = componentStr.replace(/\.\w+$/, ''); // 过滤掉后缀名，为了让 import 加入 .vue
  return () => import(/* webpackChunkName: "NotFound" */ '../' + componentPath + '.vue');
}

/**
 * @description 对比数组是否相等
 * @param {any[]} array
 * @param {any[]} other
 * @returns {boolean}
 */
export function equalArrays(array: any[], other: any[]): boolean {
  if (array.length !== other.length) return false;
  for (let i = 0, l = array.length; i < l; i++) {
    if (Array.isArray(array[i]) && Array.isArray(other[i])) {
      if (!equalArrays(array[i], other[i])) return false;
    } else if (isObject(array[i]) && isObject(other[i])) {
      if (!equalObjects(array[i], other[i])) return false;
    } else if (array[i] !== other[i]) return false;
  }
  return true;
}

/**
 * @description 对比对象是否相等
 * @param {{ [x: string]: any; }} object
 * @param {{ [x: string]: any; }} other
 * @returns {boolean}
 */
export function equalObjects(object: { [x: string]: any }, other: { [x: string]: any }): boolean {
  if (Object.keys(object).length !== Object.keys(other).length) return false;
  for (const prop in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, prop) !==
      Object.prototype.hasOwnProperty.call(other, prop)
    )
      return false;
    else if (typeof object[prop] !== typeof other[prop]) return false;
    if (Array.isArray(object[prop]) && Array.isArray(other[prop])) {
      if (!equalArrays(object[prop], other[prop])) return false;
    } else if (isObject(object[prop]) && isObject(other[prop])) {
      if (!equalObjects(object[prop], other[prop])) return false;
    } else if (object[prop] !== other[prop]) return false;
  }
  return true;
}

/**
 * @description 深度对比两个值是否相等
 * @param {any} value
 * @param {any} other
 * @returns {boolean}  {}
 */
export function isEqual(value: any, other: any): boolean {
  // 复杂类型
  if (isValidMap(value) && isValidMap(other)) {
    if (Array.isArray(value) && Array.isArray(other)) {
      return equalArrays(value, other);
    } else if (isObject(value) && isObject(other)) {
      return equalObjects(value, other);
    }
    return false;
  }
  // 简单类型
  return value === other;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}
