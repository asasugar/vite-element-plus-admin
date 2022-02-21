/*
 * @Description: 基础函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-21 19:14:47
 */
import Qs from 'qs';

/**
 * @description 用于根据当前请求的信息，生成请求 Key；
 * @export
 * @param {({ [x: string]: string | object })} config
 * @returns {*}
 */
export function generateReqKey(config: { [x: string]: string | object }) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (typeof config?.data === 'string') {
    if (isJsonStr(config.data)) {
      config.data = JSON.parse(config.data);
    }
  }
  const { method, url, params, data } = config; // 请求方式，参数，请求地址，
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&'); // 拼接
}

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
 * @param {(string | any[])} arr1
 * @param {(string | any[])} arr2
 * @returns {*}
 */
export function equalArray(arr1: string | any[], arr2: string | any[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0, l = arr1.length; i < l; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!equalArray(arr1[i], arr2[i])) return false;
    } else if (arr1[i] instanceof Object && arr2[i] instanceof Object) {
      if (!equalObject(arr1[i], arr2[i])) return false;
    } else if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

/**
 * @description 对比对象是否相等
 * @param {{ [x: string]: any; }} obj1
 * @param {{ [x: string]: any; }} obj2
 * @returns {*}
 */
export function equalObject(obj1: { [x: string]: any }, obj2: { [x: string]: any }) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (const prop in obj1) {
    if (
      Object.prototype.hasOwnProperty.call(obj1, prop) !==
      Object.prototype.hasOwnProperty.call(obj2, prop)
    )
      return false;
    else if (typeof obj1[prop] !== typeof obj2[prop]) return false;

    if (obj1[prop] instanceof Array && obj2[prop] instanceof Array) {
      if (!equalArray(obj1[prop], obj2[prop])) return false;
    } else if (obj1[prop] instanceof Object && obj2[prop] instanceof Object) {
      if (!equalObject(obj1[prop], obj2[prop])) return false;
    } else if (obj1[prop] !== obj2[prop]) return false;
  }
  return true;
}

/**
 * @description 深度对比两个值是否相等
 * @param {*} value
 * @param {*} other
 * @returns {*}  {boolean}
 */
export function isEqual(value: any, other: any) {
  // 复杂类型
  if (typeof value === 'object' && typeof other === 'object') {
    if (value instanceof Array && other instanceof Array) {
      return equalArray(value, other);
    } else if (value instanceof Object && value instanceof Object) {
      return equalObject(value, other);
    }
    return false;
  }
  // 简单类型
  return value === other;
}
