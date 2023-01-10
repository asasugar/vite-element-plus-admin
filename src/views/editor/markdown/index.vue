<!--
 * @Description: 组件管理-markdown
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 17:27:06
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
        :value="valueRef"
        placeholder="我是占位文本"
        @change="handleChange"
      />
      <el-input
        v-model="cardContent"
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
import { watch } from 'vue';

const markDownRef = $ref<Nullable<MarkDownActionType>>(null);

const markdownCache =
  window.localStorage.getItem('markdown') ??
  `
# title
# content
`;

let valueRef = $ref(markdownCache);
let cardContent = $ref<string>('');

const handleChange = (v: string) => {
  valueRef = v;
};

const toggleTheme = (theme: 'dark' | 'classic') => {
  if (!markDownRef) return;
  const vditor = markDownRef?.getVditor();
  vditor?.setTheme(theme);
};

const onMd2html = async (mdtext: string) => {
  if (!markDownRef) return;
  cardContent = await markDownRef?.md2html(mdtext);
};

const handleClear = () => {
  valueRef = '';
};

watch(
  [$$(valueRef), $$(markDownRef)],
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
