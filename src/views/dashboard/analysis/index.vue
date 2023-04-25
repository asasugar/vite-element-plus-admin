<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 15:31:05
-->
<template>
  <div class="p20">
    <grow-card :loading="loading" :data="analysis" />
    <grow-e-chart />
  </div>
</template>
<script lang="ts" setup>
import GrowCard from './components/grow-card.vue';
import GrowEChart from './components/grow-echart.vue';

import { systemService } from '@/services';
import type { ApiGetAnalysisDataRes } from '@/apis/system/typing';
const loading = ref<boolean>(true);

const analysis = ref<Nullable<ApiGetAnalysisDataRes>>(null);

const getAnalysis = async () => {
  analysis.value = await systemService.getAnalysis();
  loading.value = false;
};
getAnalysis();
</script>
