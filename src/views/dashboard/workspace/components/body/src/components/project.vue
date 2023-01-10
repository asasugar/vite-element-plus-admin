<!--
 * @Description: 工作台-body-项目列表
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 16:19:33
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '12px 12px 2px 12px' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>项目</span>
        <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
          <el-button class="button" type="text">更多</el-button>
        </el-link>
      </div>
    </template>
    <el-skeleton animated :loading="loading">
      <el-row :gutter="10">
        <el-col v-for="item in projectList" :key="item.sortId" :span="8">
          <el-card shadow="hover" class="card-wrapper--item mb10">
            <template #header>
              <div class="flex verticalcenter">
                <img :src="item.icon" class="mr5" />
                <span class="fontbold">{{ item.name }}</span>
              </div>
            </template>
            <div class="color-desc text-overflow f14">{{ item.desc }}</div>
            <div class="flex between pt10 color-desc f14">
              <span>{{ item.sortName }}</span>
              <span>{{ item.editTime }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-skeleton>
  </el-card>
</template>
<script lang="ts" setup>
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
