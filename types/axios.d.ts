/*
 * @Description: 请求声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 16:28:56
 */
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type Method = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export interface RequestExtendsOptions {
  cancelRequest?: boolean;
  cache?: boolean;
  setExpireTime?: Date;
  retry?: number;
  __retryCount?: number;
  retryDelay?: number;
}

export type CustomAxiosRequestConfig = RequestExtendsOptions & InternalAxiosRequestConfig;

export interface CustomAxiosResponse<D = any> extends AxiosResponse<D> {
  config: CustomAxiosRequestConfig;
}

export type AxiosResCode = 200 | 201 | 404 | 'default';

export interface AxiosResult<T = null> {
  result: T;
  success: boolean;
  code?: AxiosResCode;
  message?: string;
}

export type AxiosResponseHandle = Record<
  AxiosResCode,
  (response: CustomAxiosResponse<AxiosResult>) => Promise<AxiosResult>
>;
