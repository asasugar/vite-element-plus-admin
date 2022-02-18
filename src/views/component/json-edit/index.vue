<!--
 * @Description: 组件管理-markdown
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-18 18:23:30
-->
<template>
  <as-page-wrapper header-title="JSON编辑器 组件演示">
    <template #bodyContent>
      <!-- <el-button-group class="ml-4">
        <el-button type="primary" @click="toggleTheme('dark')">切换dark主题</el-button>
        <el-button type="primary" @click="toggleTheme('classic')">切换classic主题</el-button>
        <el-button type="primary" @click="handleClear">清空</el-button>
      </el-button-group>-->
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 480px;
}
</style>
