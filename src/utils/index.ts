/*
 * @Description: 基础函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:39:29
 */
import type { TargetContext } from '#/global';
import { isArray, isObject, isValidMap } from './is';

/**
 * @description 动态import
 * @param {string} component
 * @returns {*}
 */
export function dynamicImport(component: string) {
  const componentStr = component.replace(/^\/+/, ''), // 过滤字符串前面所有 '/' 字符
    componentPath = componentStr.replace(/\.\w+$/, ''); // 过滤掉后缀名，为了让 import 加入 .vue
  return () =>
    import(/* @vite-ignore */ /* webpackChunkName: "NotFound" */ '../' + componentPath + '.vue');
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
    if (isArray(array[i]) && isArray(other[i])) {
      if (!equalArrays(array[i], other[i])) return false;
    } else if (isObject(array[i]) && isObject(other[i])) {
      if (!equalObjects(array[i], other[i])) return false;
    } else if (array[i] !== other[i]) return false;
  }
  return true;
}

/**
 * @description 对比对象是否相等
 * @param {AnyObject} object
 * @param {AnyObject} other
 * @returns {boolean}
 */
export function equalObjects(object: AnyObject, other: AnyObject): boolean {
  if (Object.keys(object).length !== Object.keys(other).length) return false;
  for (const prop in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, prop) !==
      Object.prototype.hasOwnProperty.call(other, prop)
    )
      return false;
    else if (typeof object[prop] !== typeof other[prop]) return false;
    if (isArray(object[prop]) && isArray(other[prop])) {
      if (!equalArrays(object[prop], other[prop])) return false;
    } else if (isObject(object[prop]) && isObject(other[prop])) {
      if (!equalObjects(object[prop], other[prop])) return false;
    } else if (object[prop] !== other[prop]) return false;
  }
  return true;
}

/**
 * @description 深度对比数组/对象是否相等
 * @param {any} value
 * @param {any} other
 * @returns {boolean}  {}
 */
export function isEqual(value: any, other: any): boolean {
  if (!value || !other) return false;
  // 复杂类型
  if (isValidMap(value) && isValidMap(other)) {
    if (isArray(value) && isArray(other)) {
      return equalArrays(value, other);
    } else if (isObject(value) && isObject(other)) {
      return equalObjects(value, other);
    }
    return false;
  }
  // 简单类型
  return JSON.parse(JSON.stringify(value)) === JSON.parse(JSON.stringify(other));
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
