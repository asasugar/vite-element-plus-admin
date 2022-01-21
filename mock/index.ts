/*
 * @Description: mockjs
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:46:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-19 16:41:48
 */
import * as Mock from 'mockjs';

import apis from './apis';

// import { param2Obj } from './utils';

interface options {
  body: string;
  type: string;
  url: string;
}

export function mockXHR() {
  function XHRreq(response: any) {
    return function (options: options) {
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
  type iType = {
    url: string;
    type?: string;
    response: any;
  };
  let i: iType;
  for (i of apis) {
    // 生成mock模拟api
    Mock.mock(
      new RegExp(import.meta.env.VITE_BASE_URL + i.url),
      i.type || 'get',
      XHRreq(i.response)
    );
    // 设置响应时间
    Mock.setup({
      timeout: '400-1000'
    });
  }
}
