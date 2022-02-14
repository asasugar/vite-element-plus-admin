<!--
 * @Description: 工作台-body
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-14 22:14:36
-->
<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <Project :data="projectList" :loading="loading" />
    </el-col>
    <el-col :span="8">
      <QuickNav :data="navList" :loading="loading" />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import Project from './components/project.vue';
import QuickNav from './components/quick-nav.vue';

// types
interface IProjectItem {
  sortId: string;
  sortName: string;
  icon: string;
  name: string;
  desc: string;
  editTime: string;
}
interface INavItem {
  name: string;
  title: string;
}
interface Props {
  projectList?: IProjectItem[];
  navList?: INavItem[];
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
