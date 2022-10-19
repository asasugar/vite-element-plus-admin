/*
 * @Description: vite开发配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-10-19 17:29:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-19 18:03:43
 */
import { type ServerOptions } from 'vite';

export default function getServer({ command, mode }: { command: string; mode: string }): {
  server: ServerOptions;
} {
  console.log(`vite command: ${command}, vite mode: ${mode}`);

  const server: ServerOptions = {
    port: 9999,
    fs: {
      strict: true // link 调试时候设置为false
    },
    hmr: true
  };
  return { server };
}
