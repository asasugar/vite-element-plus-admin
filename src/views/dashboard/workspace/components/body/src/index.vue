<!--
 * @Description: 工作台-body
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 14:48:19
-->
<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <project :data="projectList" :loading="loading" />
      <latest-news :data="newsList" :loading="loading" class="mt15" />
    </el-col>
    <el-col :span="8">
      <quick-nav :data="navList" :loading="loading" />
      <desk-top class="mt15" />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import Project from './components/project.vue';
import QuickNav from './components/quick-nav.vue';
import LatestNews from './components/latest-news.vue';
import DeskTop from './components/desk-top.vue';

import type { IProjectItem, INavItem, INewsItem } from '../typing';

// types
interface Props {
  projectList?: IProjectItem[];
  navList?: INavItem[];
  newsList?: INewsItem[];
  loading?: boolean;
}

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
