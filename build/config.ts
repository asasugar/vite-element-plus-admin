/*
 * @Description: Config
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-22 15:59:53
 */
import { loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';
import { pathResolve } from './utils';

const Config: UserConfig = {
  server: {
    port: 9999
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
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      },
      {
        find: '_c',
        replacement: pathResolve('src/components') + '/'
      }
    ]
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    target: 'esnext',
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          echarts: ['echarts'],
          mockjs: ['mockjs'],
          three: ['three']
        }
      }
    }
  },
  preview: {
    host: true
  }
};
export function getConfig({ command, mode }: { command: string; mode: string }) {
  console.log(`vite command: ${command}, vite mode: ${mode}`);
  // 部署站点: 一级域名则使用 '/', 二级域名请设置 base 为 '/<REPO>/'，以此类推
  Config.base = loadEnv(mode, process.cwd()).VITE_REPO_URL;
  if (mode === 'analyzer') {
    Config.plugins.push({
      ...visualizer({
        gzipSize: true,
        open: true
      })
    });
  }
  return Config;
}
