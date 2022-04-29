<!--
 * @Description: 文本提示信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-07 15:54:59
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 11:07:48
-->
<template>
  <div class="alert-info">
    <div class="alert-content">{{ message }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>

<style lang="less" scoped>
@alert-main-color: #e3f4fc;
.alert-info {
  background-color: @alert-main-color;
  border: 1px solid @color-primary;
  box-sizing: border-box;
  margin: 0;
  color: @text-color;
  font-size: @font-size-base;
  font-variant: tabular-nums;
  line-height: @line-height-base;
  list-style: none;
  font-feature-settings: tnum;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  word-wrap: break-word;
  border-radius: 2px;
  .alert-content {
    color: @text-color;
    flex: 1;
    min-width: 0;
  }
}
</style>
