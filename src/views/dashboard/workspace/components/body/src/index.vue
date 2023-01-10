<!--
 * @Description: 工作台-body
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 17:16:22
-->
<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <project :project-list="projectList" :loading="loading" />
      <latest-news :news-list="newsList" :loading="loading" class="mt15" />
    </el-col>
    <el-col :span="8">
      <quick-nav :nav-list="navList" :loading="loading" />
      <desk-top class="mt15" />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import Project from './components/project.vue';
import QuickNav from './components/quick-nav.vue';
import LatestNews from './components/latest-news.vue';
import DeskTop from './components/desk-top.vue';

type Props = {
  loading: boolean;
  projectList?: {
    sortId: string;
    sortName: string;
    icon: string;
    name: string;
    desc: string;
    editTime: string;
  }[];
  navList?: {
    name: string;
    title: string;
  }[];
  newsList?: {
    href: string;
    title: string;
    avatar: string;
    description: string;
    content: string;
  }[];
};
defineProps<Props>();
</script>

<style lang="less" scoped>
.card-wrapper {
  border: none;
}

.card-wrapper--item {
  :deep(.el-card__header) {
    border-bottom: none;
  }
}
</style>
