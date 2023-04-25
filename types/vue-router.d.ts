/*
 * @Description: 路由声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 15:54:22
 */
export type RouteModules = () => Promise<AnyObject>;

export type RouteComponent = Record<string, RouteModules>;
