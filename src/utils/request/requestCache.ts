/*
 * @Description: 请求缓存
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 15:15:17
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { generateReqKey } from './helpers';
import type { CustomAxiosRequestConfig, CustomAxiosResponse } from '#/axios';

const options = {
  storage: true, // 是否开启loclastorage缓存
  storageKey: 'apiCache',
  storage_expire: 600000, // localStorage 数据存储时间10min（刷新页面判断是否清除）
  expire: 20000 // 每个接口数据缓存ms 数
};
// 初始化
(function () {
  const cache = window.localStorage.getItem(options.storageKey);
  if (cache) {
    const { storageExpire } = JSON.parse(cache);
    // 未超时不做处理
    if (storageExpire && getNowTime() - storageExpire < options.storage_expire) {
      return;
    }
  }
  window.localStorage.setItem(
    options.storageKey,
    JSON.stringify({ data: {}, storageExpire: getNowTime() })
  );
})();

function getCacheItem(key: string) {
  const cache = window.localStorage.getItem(options.storageKey);
  if (cache) {
    const { data } = JSON.parse(cache);
    return (data && data[key]) || null;
  }
}
function setCacheItem(key: string, value: any) {
  const cache = window.localStorage.getItem(options.storageKey);
  if (cache) {
    const { data, storageExpire } = JSON.parse(cache);
    data[key] = value;
    window.localStorage.setItem(options.storageKey, JSON.stringify({ data, storageExpire }));
  }
}

const _CACHES = {};
// 使用Proxy代理
const cacheHandler = {
  get: function (target: AnyObject, key: string) {
    let value = target[key];
    console.log(`${key} 被读取`, value);
    if (options.storage && !value) {
      value = getCacheItem(key);
    }
    return value;
  },
  set: function (target: AnyObject, key: string, value: any) {
    console.log(`${key} 被设置为 ${JSON.stringify(value)}`);
    target[key] = value;
    if (options.storage) {
      setCacheItem(key, value);
    }
    return true;
  }
};
const CACHES = new Proxy(_CACHES, cacheHandler);

export function requestInterceptor(config: CustomAxiosRequestConfig) {
  // 开启缓存则保存请求结果和cancel 函数
  if (config.cache) {
    const data = CACHES[`${generateReqKey(config)}`];

    // 这里用于存储是默认时间还是用户传递过来的时间
    let setExpireTime;
    config.setExpireTime
      ? (setExpireTime = config.setExpireTime)
      : (setExpireTime = options.expire);
    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < setExpireTime) {
      config.cancelToken = new Axios.CancelToken(cancel => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(data);
      }); // 传递结果到catch中
    }
  }
}

export function responseInterceptor(response: CustomAxiosResponse) {
  // 返回的code === 200 时候才会缓存下来,可根据实际业务配置
  if (response?.config?.cache && response?.data?.code === 200) {
    const data = {
      expire: getNowTime(),
      data: response
    };

    CACHES[`${generateReqKey(response.config)}`] = data;
  }
}

// 获取当前时间戳
function getNowTime() {
  return new Date().getTime();
}
