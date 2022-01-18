/*
 * @Description: fixed定位自定义指令
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2021-06-23 10:24:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-18 15:53:15
 */

const fixedDirective = (
  el: { style: { [x: string]: string; position: string } },
  binding: { arg: string; value: string }
) => {
  el.style.position = 'fixed';
  const s = binding.arg || 'top';
  el.style[s] = binding.value + 'px';
};

export function setupFixedDirective(app: {
  directive: (arg0: string, arg1: (el: any, binding: any) => void) => void;
}) {
  app.directive('fixed', fixedDirective);
}
