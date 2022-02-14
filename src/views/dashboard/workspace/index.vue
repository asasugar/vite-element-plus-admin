<!--
 * @Description: Dashboard-Workspace
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-14 23:44:13
-->
<template>
  <as-page-wrapper>
    <template #headerContent>
      <work-space-header />
    </template>
    <template #bodyContent>
      <work-space-body
        :loading="loading"
        :project-list="projectList"
        :nav-list="navList"
        :news-list="newsList"
      />
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { projectService, systemService } from '@/services';
import { AsPageWrapper } from '@/containers/page-wrapper';
import WorkSpaceHeader from './components/header';
import WorkSpaceBody from './components/body';

const projectList = ref([]);
const navList = ref([]);
const newsList = ref([]);
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
const getLatestNews = async () => {
  const content = await systemService.getLatestNews();
  newsList.value = content;
};
getProjectList();
getQuickNavList();
getLatestNews();
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
