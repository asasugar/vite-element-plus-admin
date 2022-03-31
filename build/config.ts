/*
 * @Description: Config
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 14:58:01
 */
import { loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import postCssPurge from '@fullhuman/postcss-purgecss';
import { pathResolve } from './utils';

const vuePath = /\.vue(\?.+)?$/;

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
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteCompression(), // gzip压缩
    postCssPurge({
      // 移除未使用的css
      contentFunction: sourceInputFile => {
        if (vuePath.test(sourceInputFile)) {
          return [sourceInputFile.replace(vuePath, '.vue')];
        }
        return ['src/**/*.vue', 'index.html'];
      },
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
        /^el-/
      ]
    })
  ],
  build: {
    target: 'esnext',
    cssTarget: 'chrome61',
    reportCompressedSize: false, // 禁用 gzip 压缩大小报告, 提高构建速度
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          echarts: ['echarts'],
          mockjs: ['mockjs'],
          three: ['three']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log']
      },
      output: {
        comments: true // 去掉注释内容
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
  Config.clearScreen = mode === 'production';
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
