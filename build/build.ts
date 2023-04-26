/*
 * @Description: vite打包配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-10-19 17:29:21
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-18 11:21:05
 */
import { type BuildOptions } from 'vite';

export default function getBuild(): {
  build: BuildOptions;
} {
  const build: BuildOptions = {
    target: 'esnext',
    cssTarget: 'chrome79',
    reportCompressedSize: true, // 禁用 gzip 压缩大小报告, 提高构建速度
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
  };
  return { build };
}
