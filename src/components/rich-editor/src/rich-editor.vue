<!--
 * @Description: RichEditor
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-05-30 14:25:15
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:04:15
-->
<template>
  <quill-editor
    v-model:content="richContent"
    content-type="html"
    theme="snow"
    toolbar="full"
    placeholder="请输入..."
    v-bind="{ ...attrs }"
  />
  <el-divider content-position="left">Render Html</el-divider>
  <el-input
    v-model="richContent"
    :rows="10"
    :autosize="{ minRows: 10, maxRows: 10 }"
    type="textarea"
    :readonly="true"
    placeholder="html"
  />
</template>
<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const richContent = ref<string>('');
const attrs = useAttrs();
</script>
