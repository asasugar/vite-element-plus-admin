<!--
 * @Description: 页面布局容器
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-26 16:06:39
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-07 18:12:17
-->
<template>
  <div class="page-wrapper">
    <div v-if="getShowHeader" class="page-wrapper-header">
      <template v-if="getShowDefaultHeader">
        <div v-if="headerTitle">{{ headerTitle }}</div>
        <div v-if="headerContent">{{ headerContent }}</div>
      </template>
      <slot v-else name="headerContent"></slot>
    </div>

    <div :style="{ backgroundColor: bodyBg }" class="page-wrapper-content">
      <slot name="bodyContent"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed } from 'vue';

const props = defineProps({
  headerTitle: {
    type: String,
    default: ''
  },
  headerContent: {
    type: String,
    default: ''
  },
  bodyBg: {
    type: String,
    default: 'none'
  }
});

const slots = useSlots();

const getShowDefaultHeader = computed(() => props.headerTitle || props.headerContent);
const getShowHeader = computed(() => getShowDefaultHeader.value || slots?.headerContent);
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
