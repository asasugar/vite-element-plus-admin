/*
 * @Description: mockjs
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:46:19
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2024-01-02 11:29:05
 */
import * as Mock from 'mockjs';
import apis from './apis';
import type { MockConfig, MockType } from './typing';

export function mockXHR() {
  function XHRreq(response) {
    return function (options: MockConfig) {
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

  let i: MockType;
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
