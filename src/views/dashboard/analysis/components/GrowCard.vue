<!--
 * @Description: 看板分析卡片
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-21 19:35:40
-->
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <!-- <span>{{ item.title }}</span> -->
        <el-button class="button" type="text">Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>
<script lang="ts" setup>
defineProps({
  list: {
    type: Array
  },
  loading: {
    type: Boolean
  }
});
</script>
