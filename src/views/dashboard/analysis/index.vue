<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 15:06:33
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

let loading = $ref(true);

let analysis = $ref({});

const getAnalysis = async () => {
  analysis = await systemService.getAnalysis();
  loading = false;
};
getAnalysis();
</script>
