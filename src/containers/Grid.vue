<!--
 * @Description: Grid
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 15:54:59
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 17:33:45
-->
<template>
  <ul class="grid">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  columns: {
    type: Number,
    default: 3
  }
});
</script>

<style lang="less" scoped>
.grid {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color-base);
  border-left: 1px solid var(--el-border-color-base);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(v-bind('props.columns'), 1fr);
}
</style>
