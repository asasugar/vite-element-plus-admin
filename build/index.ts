/*
 * @Description: Config
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-21 17:19:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:27:05
 */
import { type UserConfig } from 'vite';
import getBase from './base';
import getServer from './server';
import getBuild from './build';
import getPlugins from './plugin';

export function getConfig({ command, mode }: { command: string; mode: string }): UserConfig {
  console.log(`vite command: ${command}, vite mode: ${mode}`);

  return {
    ...getBase({ mode }),
    ...getServer(),
    ...getBuild(),
    ...getPlugins({ mode })
  };
}
