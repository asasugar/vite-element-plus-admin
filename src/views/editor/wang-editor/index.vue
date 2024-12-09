<!--
 * @Description: 组件管理-wangEditor
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2024-12-02 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2024-12-02 18:22:14
-->
<template>
  <as-page-wrapper header-title="WangEditor 组件演示">
    <template #extra> </template>
    <template #bodyContent>
      <as-wang-editor />
    </template>
  </as-page-wrapper>
</template>

<script lang="ts" setup name="WangEditor">
import { AsPageWrapper } from '@/containers/page-wrapper';
import { AsWangEditor } from '@/components/wang-editor';
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 480px;
}
</style>
