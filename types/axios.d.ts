/*
 * @Description: 请求声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 11:26:40
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

export interface AxiosOptions {
  url: string;
  method?: Method;
  cancelRequest?: boolean;
  cancelToken?: string | AxiosStatic.CancelToken;
  cache?: boolean;
  setExpireTime?: Date;
  retry?: number;
  __retryCount?: number;
  retryDelay?: number;
  data?: any;
  params?: AnyObject;
}

export interface AxiosResponse {
  [x: number | string]: (response: AxiosResponse) => Promise<AxiosResponse<any, any> | AxiosResult>;
}
