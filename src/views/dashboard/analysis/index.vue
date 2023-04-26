<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 14:51:30
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
import { useLoading } from '@/hooks/use-loading';
import { useData } from './hooks/use-data';

const { loading, hideLoading } = useLoading();
const { analysis, getAnalysis } = useData();

getAnalysis();
hideLoading();
</script>
