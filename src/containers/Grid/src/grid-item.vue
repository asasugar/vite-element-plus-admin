<!--
 * @Description: GridItem
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 15:54:59
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 17:33:13
-->
<template>
  <li class="grid-item">
    <slot />
  </li>
</template>

<style lang="less" scoped>
.grid-item {
  text-align: center;
  color: var(--el-text-color-regular);
  height: 90px;
  font-size: 13px;
  border-right: 1px solid var(--el-border-color-base);
  border-bottom: 1px solid var(--el-border-color-base);
  transition: background-color var(--el-transition-duration);
}
</style>
