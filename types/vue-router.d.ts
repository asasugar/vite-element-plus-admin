/*
 * @Description: 路由声明文件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-29 15:00:08
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-31 11:26:26
 */
export type TModules = () => Promise<{ [key: string]: any }>;

export type TComponent = Record<string, TModules>;

export interface IRoutes {
  path: string;
  component: string | TModules;
  redirect?: string;
  name?: string;
  meta?: {
    title: string;
  };
  children?: IRoutes[];
}
