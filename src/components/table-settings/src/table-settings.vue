<!--
 * @Description: 表格右侧设置组件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 10:58:34
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:04:48
-->
<template>
  <div class="table-settings flex verticalcenter">
    <div class="divider-vertical"></div>
    <el-tooltip effect="dark" content="刷新" placement="top">
      <p class="flex verticalcenter">
        <i-ep-refresh color="#333" class="icon" @click="handleRefresh" />
      </p>
    </el-tooltip>
    <el-tooltip effect="dark" content="密度" placement="top">
      <el-dropdown trigger="click" @command="handleCommand">
        <i-ep-sunny color="#333" class="icon" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="default">默认</el-dropdown-item>
            <el-dropdown-item command="large">中等</el-dropdown-item>
            <el-dropdown-item command="small">紧凑</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import type { EpSizeType } from '#/ep';

interface Emits {
  (e: 'onRefresh'): void;
  (e: 'onSize', command: EpSizeType): number;
}
const emit = defineEmits<Emits>();

const handleRefresh = () => {
  emit('onRefresh');
};

const handleCommand = (command: EpSizeType) => {
  emit('onSize', command);
};
</script>
<style lang="less" scoped>
.table-settings {
  padding: 0 5px;

  .divider-vertical {
    height: 0.9em;
    margin-left: 8px;
    margin-right: 3px;
    vertical-align: middle;
    border-top: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
