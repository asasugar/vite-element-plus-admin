/*
 * @Description: axios请求封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-18 20:25:00
 */

// 使用方法
// import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance();=
// 伪代码
// methods = {
//   middleViewData: proxy.$http.get("/api/simpleWeather/query", { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" } }), // 正常请求
//   cancelReq: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cancelRequest: true }), // 取消请求
//   reqAgainSend: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, retry: 3, retryDelay: 1000 }), // 请求失败重发，除了原请求外还会重发3次
//   cacheEquListParams: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cache: true }) // 缓存请求，参数值一样则取消请求
//   cacheEquList: proxy.$http.get('/api/simpleWeather/query', { data: { city: 481, key: "55333d85ca99360f79d67b452b51e277" }, cache: true, setExpireTime: 30000 }), // 缓存请求，setExpireTime 为缓存有效时间ms
// },
import Axios from 'axios';
// import { clearToken, getToken } from '../cookiesStorage.js';
import { addPendingRequest, removePendingRequest } from './cancelRepeatRquest'; // 取消重复请求
import { againRequest } from './requestAgainSend'; // 请求重发
import {
  requestInterceptor as cacheReqInterceptor,
  responseInterceptor as cacheResInterceptor
} from './requestCache';

interface Response {
  data: {
    error_code: number;
    result: any;
    reason?: string;
  };
  config: { [x: string]: string | object; cancelRequest?: any };
}
// 返回结果处理
// 自定义约定接口返回{error_code: xxx, result: xxx, reason:'err message'},根据聚合api模拟，具体可根据业务调整
const responseHandle: { [x: number | string]: (arg0: any) => void } = {
  0: (response: Response) => {
    return response.data.result;
  },
  201: (response: Response) => {
    alert(response.data.reason);
    console.log(`参数异常:${response.data.reason}`);
  },
  10012: (response: Response) => {
    alert(response.data.reason);
    console.log(response.data.reason);
  },
  10022: (response: Response) => {
    alert(response.data.reason);
    console.log(response.data.reason);
    // clearToken();
  },
  default: (response: Response) => {
    alert('操作失败');
    return Promise.reject(response);
  }
};

const axios: any = Axios.create({
  baseURL: import.meta.env.BASE_URL || '',
  timeout: 50000
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: any) {
    // 请求头用于接口token 认证
    // getToken() && (config.headers['Authorization'] = getToken());

    if (
      config?.method?.toLocaleLowerCase() === 'post' ||
      config?.method?.toLocaleLowerCase() === 'put'
    ) {
      // 参数统一处理，请求都使用data传参
      config.data = config.data.data;
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
  (response: Response) => {
    // 响应正常时候就从pendingRequest对象中移除请求
    removePendingRequest(response);
    cacheResInterceptor(response);
    return (responseHandle[response.data.error_code] || responseHandle['default'])(response);
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
