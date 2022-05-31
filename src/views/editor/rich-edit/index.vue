<!--
 * @Description: 组件管理-richEdit
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-05-30 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-05-31 10:58:54
-->
<template>
  <as-page-wrapper header-title="富文本 组件演示">
    <template #bodyContent>
      <as-rich-editor />
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup name="EditorRich">
import { AsRichEditor } from '@/components/rich-editor';
import { AsPageWrapper } from '@/containers/page-wrapper';
</script>
