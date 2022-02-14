<!--
 * @Description: 工作台-body-项目列表
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-14 23:50:36
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '12px 12px 2px 12px' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>最新动态</span>
        <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
          <el-button class="button" type="text">更多</el-button>
        </el-link>
      </div>
    </template>
    <el-skeleton animated :loading="loading">
      <as-list header="我怕老婆">
        <!-- <template #header>
          <div>123</div>
        </template>-->
      </as-list>
    </el-skeleton>
  </el-card>
</template>
<script lang="ts" setup>
import { AsList } from '@/components/list';
import type { INewsItem } from '../../types';

interface Props {
  data?: INewsItem[];
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
