/*
 * @Description: vite开发配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-10-19 17:29:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:27:24
 */
import { type ServerOptions } from 'vite';

export default function getServer(): {
  server: ServerOptions;
} {
  const server: ServerOptions = {
    port: 9999,
    fs: {
      strict: true // link 调试时候设置为false
    },
    hmr: true
  };
  return { server };
}
