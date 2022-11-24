<!--
 * @Description: 剪切板
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 17:18:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-11-24 15:16:52
-->
<template>
  <AsPageWrapper header-title="剪切版">
    <template #bodyContent>
      <div class="flex verticalcenter">
        <el-input v-model="copyValue" type="input" class="mr12" placeholder="请输入" />
        <el-button type="primary" @click="handleCopy">复制</el-button>
      </div>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { ElMessage } from 'element-plus';

const copyValue = ref<string>('');

const { clipboardRef, copiedRef } = useCopyToClipboard();
const handleCopy = () => {
  const value = unref(copyValue);
  if (!value) {
    ElMessage({ message: `请输入要拷贝的内容！`, type: 'warning' });
    return;
  }
  clipboardRef.value = value;
  if (unref(copiedRef)) {
    ElMessage({ message: `copy success！`, type: 'success' });
  }
};
</script>

<style lang="less" scoped></style>
