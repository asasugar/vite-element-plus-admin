/*
 * @Description: 请求声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-12 15:27:23
 */

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface IAxiosRequestConfig {
  url: string;
  method?: Method;
  cancelRequest?: boolean;
  cancelToken?: any;
  cache?: boolean;
  setExpireTime?: Date;
  retry?: number;
  __retryCount?: number;
  retryDelay?: number;
  data?: any;
  params?: any;
}

export interface IResult<T = any> {
  result: T;
  code: number;
  success: boolean;
}

export interface IResponseHandle {
  [x: number | string]: (response: AxiosResponse) => Promise<AxiosResponse<any, any> | IResult>;
}
