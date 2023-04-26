/*
 * @Description: echarts hooks 封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-25 17:18:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:13:41
 */
import echarts from '@/utils/echarts';
import type { EChartsOption } from 'echarts';

/**
 * @description 生成ECharts
 * @export
 * @param {Ref<HTMLDivElement>} elRef
 * @param {EChartsOption} option
 * @returns {*}
 */
export function useECharts(el: unknown, option: EChartsOption) {
  if (!el) {
    return;
  }
  const myChart = echarts.init(el as HTMLElement);
  // 使用配置项和数据显示图表。
  myChart.setOption(option as EChartsOption);
}

/**
 * @description 判断ECharts是否已经存在
 * @export
 * @param {Ref<HTMLDivElement>} elRef
 * @returns {*}  {boolean}
 */
export function isExist(el: unknown): boolean {
  if (!el) {
    return false;
  }
  const existInstance = echarts.getInstanceByDom(el as HTMLElement);
  return !!existInstance;
}
