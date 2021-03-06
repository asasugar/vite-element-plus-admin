/*
 * @Description: mockjs
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:46:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 11:47:46
 */
import * as Mock from 'mockjs';
import { IConfig, IType } from './typing';
import apis from './apis';

export function mockXHR() {
  function XHRreq(response: (arg0: { body: any; method: string; url: string }) => any) {
    return function (options: IConfig) {
      let result = null;
      if (response instanceof Function) {
        const { body, type, url } = options;
        result = response({
          body: typeof body == 'string' ? JSON.parse(body) : body,
          method: type,
          url
        });
      } else {
        result = response;
      }
      return result;
    };
  }

  let i: IType;
  for (i of apis) {
    // 生成mock模拟api
    Mock.mock(
      new RegExp(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REPO_URL}${i.url}`),
      i.type || 'get',
      XHRreq(i.response)
    );
    // 设置响应时间
    Mock.setup({
      timeout: '400-1000'
    });
  }
}
