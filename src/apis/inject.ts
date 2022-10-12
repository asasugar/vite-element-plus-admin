import requestService from '@/utils/request';
// import { IResult } from '#/axios';
// import { AxiosResponse } from 'axios';

export default function inject<T, U>(url: string, method = 'post') {
  return async (data?: T, options?: U) => {
    try {
      const res = await (requestService as any)[method](url, { data, ...options });
      return res;
    } catch (e) {
      return {
        result: e,
        code: 0,
        success: false
      };
    }
  };
}
