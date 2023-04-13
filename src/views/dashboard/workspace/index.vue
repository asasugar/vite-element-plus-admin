<!--
 * @Description: Dashboard-Workspace
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:26:03
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
import { projectService, systemService } from '@/services';
import { AsPageWrapper } from '@/containers/page-wrapper';
import WorkSpaceHeader from './components/header';
import WorkSpaceBody from './components/body';
import type { Page } from '#/global';
import type { ProjectResult, NavResult, NewsResult } from './typing';

const projectList = ref<ProjectResult['list']>([]);
const navList = ref<NavResult>([]);
const newsList = ref<NewsResult>([]);
const loading = ref<boolean>(true);

const getProjectList = async () => {
  const content = await projectService.getProjectList<Page, ProjectResult>({
    pageNum: 1,
    pageSize: 9
  });
  projectList.value = content?.list ?? [];
};
const getQuickNavList = async () => {
  navList.value = (await systemService.getQuickNavList<NavResult>()) ?? [];
};
const getLatestNews = async () => {
  newsList.value = (await systemService.getLatestNews<NewsResult>()) ?? [];
};

getProjectList();
getQuickNavList();
getLatestNews();
loading.value = false;
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: @font-size-base;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
