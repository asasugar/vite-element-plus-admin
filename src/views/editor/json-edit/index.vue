<!--
 * @Description: 组件管理-jsonEdit
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-05-31 11:02:18
-->
<template>
  <as-page-wrapper header-title="JSON美化 组件演示">
    <template #bodyContent>
      <as-json-editor />
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup name="EditorJSON">
import { AsJsonEditor } from '@/components/json-editor';
import { AsPageWrapper } from '@/containers/page-wrapper';
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 480px;
}
</style>
