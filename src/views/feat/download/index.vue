<!--
 * @Description: 文件下载
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 10:45:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:27:05
-->
<template>
  <as-page-wrapper header-title="文件下载">
    <template #bodyContent>
      <div v-for="item in downloadList" :key="item.type">
        <AsAlertInfo :message="item.message" />
        <el-button class="button" type="primary" @click="handleDownload(item.type)">{{
          item.buttonValue
        }}</el-button>
      </div>
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
import { AsAlertInfo } from '@/containers/alert-info';
import {
  downloadByStream,
  downloadByUrl,
  downloadByBase64,
  downloadByOnlineUrl
} from '@/utils/file';
import imgBase64 from './imgBase64';
import type { DownloadInfo, FileType } from './typing';

const downloadList = reactive<DownloadInfo[]>([
  { message: '根据后台接口文件流下载', buttonValue: '文件流下载', type: 'fileStream' },
  { message: '根据文件地址下载文件', buttonValue: '文件地址下载', type: 'fileUrl' },
  { message: 'base64流下载', buttonValue: 'base64流下载', type: 'base64Stream' },
  {
    message: '图片Url下载,如果有跨域问题，需要处理图片跨域',
    buttonValue: '图片Url下载',
    type: 'imgUrl'
  }
]);

const handleDownload = (type: FileType) => {
  if (!type) return;
  const map = {
    fileStream: () => downloadByStream('text content', 'testName.txt'),
    fileUrl: () =>
      downloadByUrl({
        url: 'https://raw.githubusercontent.com/asasugar/vite-element-plus-admin/master/src/assets/logo.png', // 这个要填文件地址，由于没就随便写个图片地址凑个数
        target: '_self'
      }),
    base64Stream: () => downloadByBase64(imgBase64, 'logo.png'),
    imgUrl: () =>
      downloadByOnlineUrl(
        'https://raw.githubusercontent.com/asasugar/vite-element-plus-admin/master/src/assets/logo.png',
        'logo.png'
      )
  };
  return map[type]();
};
</script>

<style lang="less" scoped>
.button {
  margin: 16px 0;
}
</style>
