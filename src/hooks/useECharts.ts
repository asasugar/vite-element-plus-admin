/*
 * @Description: echarts hooks 封装
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-25 17:18:38
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 17:58:49
 */
import { unref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import echarts from '@/utils/echarts';

export function useECharts(elRef: Ref<HTMLDivElement>, option: EChartsOption) {
  const el = unref(elRef);
  if (!el) {
    return;
  }
  const myChart = echarts.init(el);

  // 使用配置项和数据显示图表。
  myChart.setOption(option as EChartsOption);
}
