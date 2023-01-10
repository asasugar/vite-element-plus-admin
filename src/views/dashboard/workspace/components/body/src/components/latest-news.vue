<!--
 * @Description: 工作台-body-项目列表
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 16:18:12
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '0' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>最新动态</span>
        <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
          <el-button class="button" type="text">更多</el-button>
        </el-link>
      </div>
    </template>
    <el-skeleton animated :loading="loading">
      <template #template>
        <div class="flex center mt20 mb20">
          <div class="flex column flex__item">
            <el-skeleton-item variant="p" class="m10" />
            <el-skeleton-item variant="p" class="m10" />
            <el-skeleton-item variant="p" class="m10" />
          </div>
          <el-skeleton-item variant="image" style="width: 272px; height: 168px; margin: 0 20px" />
        </div>
      </template>
      <as-list :data-source="newsList">
        <template #header>
          <div>
            <b>as list vue</b>
            header part
          </div>
        </template>
        <template #renderItem="{ item }">
          <as-list-item v-if="item">
            <as-list-item-meta :description="item.description">
              <template #title>
                <el-link :href="item.href" :underline="false">{{ item.title }}</el-link>
              </template>
              <template #avatar>
                <el-avatar :src="item.avatar" size="small" />
              </template>
            </as-list-item-meta>
            {{ item.content }}
            <template #extras>
              <img
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </template>
            <template #actions>
              <div class="flex verticalcenter">
                <div class="flex center color-inherit">
                  <i-ep-star />
                  <span class="pl5">152</span>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="flex center color-inherit">
                  <i-ep-camera />
                  <span class="pl5">152</span>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="flex center color-inherit">
                  <i-ep-chat-dot-round />
                  <span class="pl5">2</span>
                </div>
              </div>
            </template>
          </as-list-item>
        </template>
        <template #footer>
          <div>
            <b>as list vue</b>
            footer part
          </div>
        </template>
      </as-list>
    </el-skeleton>
  </el-card>
</template>
<script lang="ts" setup>
import { AsList, AsListItem, AsListItemMeta } from '@/components/list';

type Props = {
  loading: boolean;
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
