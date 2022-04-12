<!--
 * @Description: 组件管理-markdown
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:59:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-12 16:36:36
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

<script lang="ts" setup name="ComponentMarkdown">
import { ref, unref, watch } from 'vue';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { AsMarkdown, MarkDownActionType } from '@/components/markdown';
import type { Nullable } from '#/global';

const markDownRef = ref<Nullable<MarkDownActionType>>(null);

const markdownCache =
  window.localStorage.getItem('markdown') ??
  `
# title
# content
`;

const valueRef = ref(markdownCache);
const cardContent = ref<string>('');

const handleChange = (v: string) => {
  valueRef.value = v;
};

const toggleTheme = (theme: 'dark' | 'classic') => {
  const instance = unref(markDownRef);

  if (!instance) return;
  const vditor = instance?.getVditor();
  vditor?.setTheme(theme);
};

const onMd2html = async (mdtext: string) => {
  const instance = unref(markDownRef);
  if (!instance) return;
  cardContent.value = await instance?.md2html(mdtext);
};

const handleClear = () => {
  valueRef.value = '';
};

watch(
  [valueRef, markDownRef],
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
