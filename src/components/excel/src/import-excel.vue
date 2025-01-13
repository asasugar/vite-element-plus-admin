<template>
  <div>
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
      @change="handleInputClick"
    />
    <div @click="handleUpload">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { excelToJson } from '@asasugar-use/custom-json2excel';
import type { ExcelData } from './typing';

interface Emits {
  (e: 'success', excelData: ExcelData[]): void;
  (e: 'error'): void;
}

const emit = defineEmits<Emits>();

const inputRef = ref<HTMLInputElement | null>(null);
const loadingRef = ref<boolean>(false);

function upload(rawFile: File) {
  const inputRefDom = unref(inputRef);
  if (inputRefDom) {
    // ix can't select the same excel
    inputRefDom.value = '';
  }
  loadingRef.value = true;

  return new Promise(async (resolve, reject) => {
    try {
      const excelData = await excelToJson(rawFile);
      emit('success', excelData);
      resolve('');
    } catch (error) {
      reject(error);
      emit('error');
    } finally {
      loadingRef.value = false;
    }
  });
}
/**
 * @description: 触发选择文件管理器
 */
function handleInputClick(e: Event) {
  const files = (e?.target as unknown as { files: File[] })?.files;
  const rawFile = files?.[0]; // only setting files[0]
  if (!rawFile) return;
  upload(rawFile);
}
/**
 * @description: 点击上传按钮
 */
function handleUpload(): MouseEvent | undefined {
  const inputRefDom = unref(inputRef);
  inputRefDom?.click();
  return;
}
</script>
