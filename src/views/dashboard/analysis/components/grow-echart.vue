<!--
 * @Description: 看板分析charts图表
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 15:22:36
-->
<template>
  <el-tabs v-model="tabPane" type="card" class="bg-white mt20" @tab-click="handleClickTab">
    <el-tab-pane label="销量" name="1">
      <div ref="chartRef1" :style="props"></div>
    </el-tab-pane>
    <el-tab-pane label="流量" name="2">
      <div ref="chartRef2" :style="props"></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useECharts, isExist } from '@/hooks/use-echarts';
import { option1, option2 } from './data';
import type { Ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const props = defineProps({
  width: {
    type: String,
    default: '1000px'
  },
  height: {
    type: String,
    default: '450px'
  }
});
const tabPane = ref<string>('1');
const chartRef1 = ref<Ref<HTMLDivElement>>();
const chartRef2 = ref<Ref<HTMLDivElement>>();

onMounted(() => {
  // 初始化第一张图表
  if (chartRef1.value) {
    let isexist = isExist(chartRef1.value);
    if (!isexist) {
      useECharts(chartRef1.value, option1);
    }
  }
});

// 点击切换图表为第二张的时候，渲染第二张图表
const handleClickTab = (pane: TabsPaneContext) => {
  const { name } = pane.props;
  if (name === '2' && chartRef2.value) {
    let isexist = isExist(chartRef2.value);
    if (!isexist) {
      useECharts(chartRef2.value, option2);
    }
  }
};
</script>

<style lang="less" scoped></style>
