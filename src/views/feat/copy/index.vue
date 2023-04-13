<!--
 * @Description: 剪切板
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 17:18:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 17:53:51
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
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { ElMessage } from 'element-plus';

const copyValue = ref<string>('');
const { clipboardRef, isSuccessRef } = useCopyToClipboard();

const handleCopy = () => {
  if (!copyValue.value) {
    ElMessage({ message: `请输入要拷贝的内容！`, type: 'warning' });
    return;
  }
  clipboardRef.value = copyValue.value;

  if (isSuccessRef.value) {
    ElMessage({ message: `copy success！`, type: 'success' });
  }
};
</script>

<style lang="less" scoped></style>
