/*
 * @Description: axios请求封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 18:21:55
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Axios from 'axios';
import { getToken } from '@/utils/token';
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import {
  requestInterceptor as cacheReqInterceptor,
  responseInterceptor as cacheResInterceptor
} from './requestCache';
import { ElMessage } from 'element-plus';
interface IResponse {
  data: {
    code: number;
    result: any;
    message?: string;
  };
  config: { [x: string]: string | object; cancelRequest?: any };
}
// 返回结果处理
// 自定义约定接口返回{code: xxx, result: xxx, message:'err message'},根据api模拟，具体可根据业务调整
const responseHandle: { [x: number | string]: (arg0: any) => void } = {
  200: (response: IResponse) => {
    return Promise.resolve(response.data);
  },
  201: (response: IResponse) => {
    ElMessage({ message: `参数异常:${response.data.message}`, type: 'warning' });
    return Promise.resolve(response.data);
  },
  404: (response: IResponse) => {
    ElMessage({ message: '接口地址不存在', type: 'error' });
    return Promise.reject(response);
  },
  default: (response: IResponse) => {
    ElMessage({ message: response.data.message || '操作失败', type: 'error' });
    return Promise.reject(response);
  }
};

const axios: any = Axios.create({
  baseURL: (import.meta as any).env.VITE_BASE_URL || '',
  timeout: 50000
});
axios.defaults.headers['content-type'] = 'application/json';

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: any) {
    // 请求头用于接口token 认证(简，详细根据后端规则适配)
    getToken() && (config.headers['Authorization'] = getToken());
    if (
      config?.method?.toLocaleLowerCase() === 'post' ||
      config?.method?.toLocaleLowerCase() === 'put'
    ) {
      // 参数统一处理，请求都使用data传参
      config.data = config.data?.data;
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
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    //  请求缓存
    cacheReqInterceptor(config, axios);
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response: IResponse) => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response);
    cacheResInterceptor(response);
    return (responseHandle[response.data.code] || responseHandle['default'])(response);
  },
  (error: { config: any; message?: any }) => {
    // 从pending 列表中移除请求
    removePendingRequest(error.config || {});
    // 需要特殊处理请求被取消的情况
    if (!Axios.isCancel(error)) {
      // 请求重发
      againRequest(error, axios);
    }
    // 请求缓存处理方式
    if (Axios.isCancel(error) && error.message.data && error.message.data.config.cache) {
      return Promise.resolve(error.message.data.data.result); // 返回结果数据,根据实际业务配置
    }
    return Promise.reject(error);
  }
);
export default axios;
