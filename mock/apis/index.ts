/*
 * @Description: 导出mock api
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-19 11:47:21
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 11:16:31
 */

import user from './user';
import system from './system';
import project from './project';

export default [...user, ...system, ...project];
