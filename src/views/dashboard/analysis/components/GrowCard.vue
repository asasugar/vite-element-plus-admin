<!--
 * @Description: 看板分析卡片
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 17:02:30
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
          <div class="text-left f30">{{ item.value }}</div>
          <div class="flex center beteen">
            <span class="wp50 text-left">总{{ item.title }}</span>
            <span class="wp50 text-right">{{ item.total }}</span>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  data: {
    type: Object
  },
  loading: {
    type: Boolean
  }
});
</script>

<style lang="less" scoped></style>
