<!--
 * @Description: 组件管理-markdown
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 18:36:22
-->
<template>
  <as-page-wrapper header-title="Markdown 组件演示">
    <template #extra>
      <el-button-group class="ml-4">
        <el-button type="primary" @click="toggleTheme('dark')">切换dark主题</el-button>
        <el-button type="primary" @click="toggleTheme('classic')">切换classic主题</el-button>
        <el-button type="primary" @click="handleClear">清空</el-button>
      </el-button-group>
    </template>
    <template #bodyContent>
      <as-markdown
        ref="markDownRef"
        :value="mdValueRef"
        placeholder="我是占位文本"
        @change="onChange"
      />
      <el-input
        v-model="md2htmlText"
        class="mt10"
        :rows="10"
        :autosize="{ minRows: 6, maxRows: 10 }"
        type="textarea"
        placeholder="html"
      />
    </template>
  </as-page-wrapper>
</template>

<script lang="ts" setup name="EditorMarkdown">
import { AsMarkdown, MarkDownActionType } from '@/components/markdown';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useButton } from './hooks/use-button';
import { useMarkdown } from './hooks/use-md';

const markDownRef = ref<Nullable<MarkDownActionType>>(null);
const { toggleTheme, onClear } = useButton(markDownRef);
const { mdValueRef, md2htmlText, onChange, onMd2html } = useMarkdown(markDownRef);

const handleClear = () => {
  onClear(mdValueRef);
};

watch(
  [mdValueRef, markDownRef],
  currValue => {
    !currValue.includes(null) && onMd2html(currValue[0]);
  },
  {
    immediate: true
  }
);
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 480px;
}
</style>
