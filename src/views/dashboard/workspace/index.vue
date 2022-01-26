<!--
 * @Description: Dashboard-Workspace
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-26 16:35:45
-->
<template>
  <PageWrapper>
    <template #headerContent>
      <WorkSpaceHeader />
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import PageWrapper from '@/containers/PageWrapper.vue';
import WorkSpaceHeader from './components/WorkSpaceHeader.vue';
// import GrowChart from './components/GrowChart.vue';

import { systemService } from '@/services';

const loading = ref(true);

const data = reactive({
  analysis: {}
});

// const getAnalysis = async () => {
//   data.analysis = await systemService.getAnalysis();
//   loading.value = false;
// };
// getAnalysis();
</script>
