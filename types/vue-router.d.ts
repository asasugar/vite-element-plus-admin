/*
 * @Description: 路由声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-18 17:19:02
 */
export type RouteModules = () => Promise<AnyObject>;

export type RouteComponent = Record<string, RouteModules>;

export interface RouteInfo {
  path: string;
  component: string | RouteModules;
  redirect?: string;
  name?: string;
  meta?: {
    title: string;
  };
  children?: RouteInfo[];
}
