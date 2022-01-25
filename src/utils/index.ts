/*
 * @Description: 基础函数
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 14:45:42
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
  return () => import('../' + componentPath + '.vue');
}
