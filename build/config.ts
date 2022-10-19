/*
 * @Description: Config
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-14 18:44:21
 */
import { loadEnv, splitVendorChunkPlugin, type PluginOption, type UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import visualizer from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import postCssPurge from '@fullhuman/postcss-purgecss';
import { pathResolve } from './utils';

const vuePath = /\.vue(\?.+)?$/;

const Config: UserConfig = {
  root: process.cwd(),
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
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],

      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: 'types/components.d.ts'
    }),
    Icons({
      autoInstall: true
    }),
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
    }) as unknown as PluginOption,
    vueSetupExtend(),
    splitVendorChunkPlugin(),
    viteCompression() // gzip压缩
  ],
  build: {
    target: 'esnext',
    cssTarget: 'chrome79',
    reportCompressedSize: false, // 禁用 gzip 压缩大小报告, 提高构建速度
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          echarts: ['echarts'],
          mockjs: ['mockjs'],
          three: ['three'],
          xlsx: ['xlsx'],
          dayjs: ['dayjs']
        }
      }
    },
    minify: 'esbuild' // 默认为 Esbuild，它比 terser 快 20-40 倍，压缩率差 1%-2%
    // mini: 'terser' 时可用，且需将Top-level await改造成自执行函数
    // terserOptions: {
    //   compress: {
    //     drop_console: true, //打包时删除console
    //     drop_debugger: true, //打包时删除 debugger
    //     pure_funcs: ['console.log']
    //   },
    //   output: {
    //     comments: true // 去掉注释内容
    //   }
    // }
  },
  preview: {
    host: true,
    port: 5001
  }
};
export function getConfig({ command, mode }: { command: string; mode: string }) {
  console.log(`vite command: ${command}, vite mode: ${mode}`);
  // 部署站点: 一级域名则使用 '/', 二级域名请设置 base 为 '/<REPO>/'，以此类推
  Config.base = loadEnv(mode, process.cwd()).VITE_REPO_URL;
  Config.clearScreen = mode === 'production';
  if (mode === 'analyzer') {
    Config.plugins?.push(
      visualizer({
        gzipSize: true,
        open: true
      }) as PluginOption
    );
  }
  return Config;
}
