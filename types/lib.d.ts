declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosResponse;
  }
}
export interface AxiosResponse<T = any> {
  result: T;
  code: number;
  success: boolean;
}
