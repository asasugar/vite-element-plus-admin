<!--
 * @Description: WangEditor
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2024-12-02 14:25:15
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2025-01-13 16:45:25
-->
<template>
  <div class="as-wang-editor">
    <toolbar class="toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <editor
      v-model="valueHtml"
      class="view-area"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');
const mode = ref('default');

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="less" scoped>
.as-wang-editor {
  border: 1px solid #ccc;
  .toolbar {
    border-bottom: 1px solid #ccc;
  }
  .view-area {
    height: 500px;
    overflow-y: hidden;
  }
}
</style>
