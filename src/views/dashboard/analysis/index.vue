<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-24 14:22:37
-->
<template>
  <div class="p20">
    <GrowCard :loading="loading" :data="data.analysis" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <!-- <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>-->
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import GrowCard from './components/GrowCard.vue';
import { systemService } from '@/services';

// import SiteAnalysis from './components/SiteAnalysis.vue';
// import VisitSource from './components/VisitSource.vue';
// import VisitRadar from './components/VisitRadar.vue';
// import SalesProductPie from './components/SalesProductPie.vue';
const loading = ref(true);

const data = reactive({
  analysis: {}
});

const getAnalysis = async () => {
  data.analysis = await systemService.getAnalysis();
  loading.value = false;
};
getAnalysis();
</script>
