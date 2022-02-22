/*
 * @Description: Base
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-22 15:22:01
 */
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';
import { pathResolve } from './utils';

const Config = {
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
export function getConfig({ command, mode }) {
  console.log(`vite command: ${command}, vite mode: ${mode}`);
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
