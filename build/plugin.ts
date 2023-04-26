/*
 * @Description: vite插件配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-10-19 17:28:25
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:27:15
 */

import { splitVendorChunkPlugin, type PluginOption } from 'vite';
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

export default function getPlugins({ mode }: { mode: string }): {
  plugins: PluginOption[];
} {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', 'pinia'],

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
        const vuePath = /\.vue(\?.+)?$/;
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
    }),
    vueSetupExtend(),
    splitVendorChunkPlugin(),
    viteCompression() // gzip压缩
  ];
  if (mode === 'analyzer') {
    plugins.push(
      visualizer({
        gzipSize: true,
        open: true
      }) as PluginOption
    );
  }
  return { plugins };
}
