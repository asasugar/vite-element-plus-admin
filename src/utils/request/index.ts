/*
 * @Description: axios请求封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 13:51:30
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Axios, { AxiosInstance } from 'axios';
import { getToken } from '@/utils/token';
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import {
  requestInterceptor as cacheReqInterceptor,
  responseInterceptor as cacheResInterceptor
} from './requestCache';
import { ElMessage } from 'element-plus';
import type { AxiosOptions, AxiosResCode, AxiosResponseHandle } from '#/axios';

// 返回结果处理
// 自定义约定接口返回{code: xxx, result: xxx, message:'err message'},根据api模拟，具体可根据业务调整
const responseHandle: AxiosResponseHandle = {
  200: (response: { data: AnyObject }) => {
    return Promise.resolve(response.data);
  },
  201: (response: { data: { message?: string } }) => {
    ElMessage({ message: `参数异常:${response.data.message}`, type: 'warning' });
    return Promise.resolve(response.data);
  },
  404: (response: { data: AnyObject }) => {
    ElMessage({ message: '接口地址不存在', type: 'error' });
    return Promise.reject(response.data);
  },
  default: (response: { data: { message?: string } }) => {
    ElMessage({ message: response.data.message || '操作失败', type: 'error' });
    return Promise.reject(response.data);
  }
};

const axios: AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REPO_URL}` || '',
  timeout: 50000,
  headers: {
    'content-type': 'application/json',
    // 请求头用于接口token 认证(简，详细根据后端规则适配)
    Authorization: getToken() ?? false
  }
});

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
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
    addPendingRequest(config as AxiosOptions); // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    cacheReqInterceptor(config as AxiosOptions);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response.config as AxiosOptions);
    cacheResInterceptor(response as { config: AxiosOptions; data: { code: number } });
    const code: AxiosResCode = response.data.code;
    return ((code && responseHandle[code]) || responseHandle['default'])(response);
  },
  error => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});
    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      // 请求重发
      againRequest(error, axios);
    }
    // 请求缓存处理方式
    if (Axios.isCancel(error) && (error?.message as any)?.data?.config?.cache) {
      return Promise.resolve((error?.message as any)?.data?.data?.result); // 返回结果数据,根据实际业务配置
    }
    return Promise.reject(error);
  }
);
export default axios;
