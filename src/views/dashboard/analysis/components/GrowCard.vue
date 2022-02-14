<!--
 * @Description: 看板分析卡片
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-14 22:43:19
-->
<template>
  <div class="flex">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #default>
        <el-card v-for="(item, key) in data" :key="key" class="wp25 mr20" shadow="hover">
          <template #header>
            <div class="flex center between">
              <span>{{ item.title }}</span>
              <el-tag class="ml-2" :type="item.tagType">{{ item.action }}</el-tag>
            </div>
          </template>
          <as-count-to
            :prefix="key === 'total' ? '¥' : ''"
            :start-val="1"
            :end-val="item.value"
            class="text-left f30"
          />
          <div class="flex center beteen">
            <span class="wp50 text-left">总{{ item.title }}</span>
            <as-count-to
              :prefix="key === 'total' ? '¥' : ''"
              :start-val="1"
              :end-val="item.total"
              class="wp50 text-right"
            />
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>
<script lang="ts" setup>
import AsCountTo from '@/components/count-to';
defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="less" scoped></style>
