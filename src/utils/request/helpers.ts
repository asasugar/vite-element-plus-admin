/*
 * @Description:
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-30 16:01:52
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 15:46:14
 */
import Qs from 'qs';
import { isJsonStr } from '@/utils/is';
import type { CustomAxiosRequestConfig } from '#/axios';

/**
 * @description 用于根据当前请求的信息，生成请求 Key；
 * @param {CustomAxiosRequestConfig} config
 * @returns {*}
 */
export function generateReqKey(config: CustomAxiosRequestConfig) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (typeof config?.data === 'string') {
    if (isJsonStr(config.data)) {
      config.data = JSON.parse(config.data);
    }
  }
  const { method, url, params, data } = config; // 请求方式，参数，请求地址，
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&'); // 拼接
}
