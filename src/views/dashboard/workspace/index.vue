<!--
 * @Description: Dashboard-Workspace
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:14:27
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 14:48:13
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
import { AsPageWrapper } from '@/containers/page-wrapper';
import WorkSpaceHeader from './components/header';
import WorkSpaceBody from './components/body';
import { useLoading } from '@/hooks/use-loading';
import { useData } from './hooks/use-data';

const { loading, hideLoading } = useLoading();
const { projectList, navList, newsList, getProjectList, getQuickNavList, getLatestNews } =
  useData();

getProjectList();
getQuickNavList();
getLatestNews();
hideLoading();
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
