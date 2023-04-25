/*
 * @Description: axios请求封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 17:08:45
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/token';
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import {
  requestInterceptor as cacheReqInterceptor,
  responseInterceptor as cacheResInterceptor
} from './requestCache';
import type { CustomAxiosRequestConfig } from '#/axios';

const instance: AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REPO_URL}` || '',
  timeout: 50000,
  headers: {
    'content-type': 'application/json',
    // 请求头用于接口token 认证(简，详细根据后端规则适配)
    Authorization: getToken() ?? false
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config?.method?.toLocaleLowerCase() === 'post' ||
      config?.method?.toLocaleLowerCase() === 'put'
    ) {
      // 参数统一处理，请求都使用data传参
      Object.assign(config, { ...config.data });
    } else if (
      config?.method?.toLocaleLowerCase() === 'get' ||
      config?.method?.toLocaleLowerCase() === 'delete'
    ) {
      // 参数统一处理
      config.params = config.data;
    } else {
      alert('不允许的请求方法：' + config.method);
    }
    // pendding 中的请求，后续请求不发送（由于存放的peddingMap 的key 和参数有关，所以放在参数处理之后）
    addPendingRequest(config as CustomAxiosRequestConfig); // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    cacheReqInterceptor(config as CustomAxiosRequestConfig);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response.config as CustomAxiosRequestConfig);
    cacheResInterceptor(response);

    // return response.data
    return response;
  },
  (error: AxiosError) => {
    // 从pending 列表中移除请求
    removePendingRequest((error.config as CustomAxiosRequestConfig) || {});
    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      // 请求重发
      againRequest(error, instance);
    }
    // 请求缓存处理方式
    if (Axios.isCancel(error) && (error?.message as any)?.data?.config?.cache) {
      return Promise.resolve((error?.message as any)?.data?.data?.result); // 返回结果数据,根据实际业务配置
    }
    return Promise.reject(error);
  }
);

export default instance;
