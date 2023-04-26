<!--
 * @Description: 页面布局容器-main(可折叠)
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-26 16:06:39
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:07:41
-->
<template>
  <div class="collapse-main">
    <el-collapse v-model="activeNames" :accordion="accordion">
      <el-collapse-item :title="title" name="1">
        <slot name="main-content" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
// types
interface Props {
  accordion?: boolean;
  title: string;
}

withDefaults(defineProps<Props>(), {
  accordion: true
});
const activeNames = ref<string[]>(['1']);
</script>

<style lang="less" scoped>
.page-wrapper {
  position: relative;
  &-header {
    padding: 20px 30px;
    background-color: @bg-color;
  }
  &-content {
    margin: 16px;
  }
}
</style>
