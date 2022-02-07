/*
 * @Description: 类型声明
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-25 14:42:17
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 18:31:58
 */
export interface IRoutes {
  path: string;
  component: string;
  redirect?: string;
  name: string | undefined;
  meta?: {
    title: string;
  };
  children?: IRoutes[];
}
