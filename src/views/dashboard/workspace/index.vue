<!--
 * @Description: Dashboard-Workspace
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 19:00:52
-->
<template>
  <PageWrapper>
    <template #headerContent>
      <WorkSpaceHeader />
    </template>
    <template #bodyContent>
      <WorkSpaceBody :project-list="projectList" :nav-list="navList" :loading="loading" />
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { projectService, systemService } from '@/services';
import PageWrapper from '@/containers/PageWrapper.vue';
import WorkSpaceHeader from './components/WorkSpaceHeader.vue';
import WorkSpaceBody from './components/WorkSpaceBody.vue';

const projectList = ref([]);
const navList = ref([]);
const loading = ref<boolean>(true);
const getProjectList = async () => {
  const { content } = await projectService.getProjectList({
    pageNum: 1,
    pageSize: 9
  });
  projectList.value = content;
};
const getQuickNavList = async () => {
  const content = await systemService.getQuickNavList();
  navList.value = content;
};

getProjectList();
getQuickNavList();
setTimeout(() => {
  loading.value = false;
}, 1000);
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
