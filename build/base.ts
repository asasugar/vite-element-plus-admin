/*
 * @Description: Config
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-19 17:57:21
 */
import { loadEnv, type UserConfig } from 'vite';
import { pathResolve } from './utils';

export default function getBase({ mode }: { mode: string }): UserConfig {
  const baseConfig: UserConfig = {
    root: process.cwd(),
    base: loadEnv(mode, process.cwd()).VITE_REPO_URL, // 部署站点: 一级域名则使用 '/', 二级域名请设置 base 为 '/<REPO>/'，以此类推
    clearScreen: mode === 'production',
    server: {
      port: 9999,
      fs: {
        strict: true // link 调试时候设置为false
      },
      hmr: true
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${pathResolve('src/style/CONST.less')}";`
          },
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: '#',
          replacement: pathResolve('types') + '/'
        }
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    preview: {
      host: true,
      port: 5001
    }
  };
  return baseConfig;
}
