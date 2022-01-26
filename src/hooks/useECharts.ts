/*
 * @Description: echarts hooks 封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-25 17:18:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-26 15:15:21
 */
import { unref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import echarts from '@/utils/echarts';

/**
 * @description 生成ECharts
 * @export
 * @param {Ref<HTMLDivElement>} elRef
 * @param {EChartsOption} option
 * @returns {*}
 */
export function useECharts(elRef: Ref<HTMLDivElement>, option: EChartsOption) {
  const el = unref(elRef);
  if (!el) {
    return;
  }
  const myChart = echarts.init(el);
  // 使用配置项和数据显示图表。
  myChart.setOption(option as EChartsOption);
}

/**
 * @description 判断ECharts是否已经存在
 * @export
 * @param {Ref<HTMLDivElement>} elRef
 * @returns {*}  {boolean}
 */
export function isExist(elRef: Ref<HTMLDivElement>): boolean {
  const el = unref(elRef);
  if (!el) {
    return false;
  }
  const existInstance = echarts.getInstanceByDom(el);
  return !!existInstance;
}
