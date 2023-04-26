<!--
 * @Description: Grid
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 15:54:59
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:07:03
-->
<template>
  <ul class="grid">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
interface Props {
  columns?: number;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3
});
</script>

<style lang="less" scoped>
.grid {
  overflow: hidden;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color-base);
  border-left: 1px solid var(--el-border-color-base);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(v-bind('props.columns'), 1fr);
}
</style>
