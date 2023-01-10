<!--
 * @Description: 工作台-body-快捷导航
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 16:19:24
-->
<template>
  <el-card>
    <template #header>
      <div class="flex between verticalcenter">
        <span>快捷导航</span>
      </div>
    </template>
    <el-skeleton animated :loading="loading">
      <as-grid>
        <as-grid-item v-for="item in navList" :key="item.name">
          <div class="flex column center hp100 nav-card">
            <i-ep-home-filled
              v-if="item.name === 'Home'"
              color="rgb(31, 218, 202)"
              size="20"
              class="nav-icon"
            />
            <i-ep-data-analysis
              v-else-if="item.name === 'DashboardAnalysis'"
              color="rgb(0, 216, 255)"
              class="nav-icon"
            />
            <i-ep-menu
              v-else-if="item.name === 'DashboardWorkspace'"
              color="rgb(191, 12, 44)"
              class="nav-icon"
            />
            <i-ep-setting
              v-else-if="item.name === 'SystemSetting'"
              color="rgb(63, 178, 127)"
              class="nav-icon"
            />
            <i-ep-key
              v-else-if="item.name === 'SystemAuth'"
              color="rgba(77, 175, 27, 0.79)"
              class="nav-icon"
            />
            <i-ep-pie-chart v-else color="rgb(225, 133, 37)" class="nav-icon" />

            <div class="mt10 f14">{{ item.title }}</div>
          </div>
        </as-grid-item>
      </as-grid>
    </el-skeleton>
  </el-card>
</template>
<script lang="ts" setup>
import { AsGrid, AsGridItem } from '@/containers/grid';

type Props = {
  loading: boolean;
  navList?: {
    name: string;
    title: string;
  }[];
};
defineProps<Props>();
</script>

<style lang="less" scoped>
.nav-icon {
  width: 20px;
  height: 20px;
}

.nav-card:hover {
  transition: var(--el-transition-duration);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
