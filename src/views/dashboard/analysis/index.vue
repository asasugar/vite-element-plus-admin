<!--
 * @Description: Dashboard-Analysis
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-14 22:47:30
-->
<template>
  <div class="p20">
    <grow-card :loading="loading" :data="data.analysis" />
    <grow-e-chart />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import GrowCard from './components/grow-card.vue';
import GrowEChart from './components/grow-echart.vue';

import { systemService } from '@/services';

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
