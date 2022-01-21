<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 18:37:58
-->
<template>
  <div class="p-4">
    <GrowCard :loading="loading" :list="list" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <!-- <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>-->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import GrowCard from './components/GrowCard.vue';
// import SiteAnalysis from './components/SiteAnalysis.vue';
// import VisitSource from './components/VisitSource.vue';
// import VisitRadar from './components/VisitRadar.vue';
// import SalesProductPie from './components/SalesProductPie.vue';
const loading = ref(true);
const list: any = [
  {
    title: '访问数',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '月'
  },
  {
    title: '成交额',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '月'
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周'
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年'
  }
];
setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
