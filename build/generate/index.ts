/*
 * @Description: 根据目录动态生成动态路由keyMap
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 15:23:59
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-21 17:11:29
 */
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import ArtTemplate from 'art-template';

const routes = [{ camelcase: 'Home', path: '@/views/home/index.vue' }];
// 生成 components.ts

export function generateDynamicComponents() {
  const indexTpl = readFileSync(resolve(__dirname, './tpls/dynamicComponents.tpl'), 'utf-8');

  writeFileSync(
    resolve(process.cwd(), './src/router/auto-import-components.ts'),
    ArtTemplate.render(indexTpl, {
      data: {
        components: routes
      }
    }),
    'utf-8'
  );
}
