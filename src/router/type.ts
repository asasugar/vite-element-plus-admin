/*
 * @Description: 类型声明
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-25 14:42:17
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 14:42:18
 */
export interface IRoutes {
  path: string;
  component: string;
  redirect?: any;
  name: string | undefined;
  meta?: any;
  children?: any[];
}
