<!--
 * @Description: 水印
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 15:03:12
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:30:36
-->
<template>
  <AsPageWrapper header-title="水印示例">
    <template #bodyContent>
      <AsCollapseMain title="Global WaterMark">
        <template #main-content>
          <div class="flex verticalcenter">
            <el-input
              v-model="watermaskValue"
              class="input"
              type="input"
              placeholder="请输入水印文本"
            />
            <el-button type="primary" @click="handleSetWatermask">生成</el-button>
            <el-button type="danger" @click="clear">清除</el-button>
          </div>
        </template>
      </AsCollapseMain>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsCollapseMain } from '@/containers/page-main';
import { useWatermask } from '@/hooks/use-watermask';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { ElMessage } from 'element-plus';

const watermaskValue = ref<string>('');

const { setWatermask, clear } = useWatermask();

const handleSetWatermask = () => {
  if (!watermaskValue.value) {
    ElMessage({ message: `请输入水印文本！`, type: 'warning' });
    return;
  }
  setWatermask(watermaskValue.value);
};
</script>

<style lang="less" scoped>
.input {
  width: 400px;
  margin-right: 12px;
}
</style>
