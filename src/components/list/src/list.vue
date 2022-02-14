<!--
 * @Description: List
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-15 00:26:00
-->
<template>
  <div :class="classString">
    <div v-if="getShowHeader" :class="`${prefixCls}-header`">
      <template v-if="header">{{ header }}</template>
      <slot name="header" />
    </div>
    <!-- {childrenContent}

    {children}-->
    <template v-if="dataSource.length">
      <ul v-for="(item, index) in dataSource" :key="index" :class="`${prefixCls}-items`">
        <slot name="renderItem" :item="item" :index="index" />
      </ul>
    </template>
    <el-empty v-else :description="empty.emptyText"></el-empty>
    <div v-if="getShowFooter" :class="`${prefixCls}-footer`">
      <template v-if="footer">{{ footer }}</template>
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots, computed } from 'vue';

const props = defineProps({
  header: {
    type: String,
    default: ''
  },
  footer: {
    type: String,
    default: ''
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  empty: {
    type: Object,
    default: () => ({
      emptyText: 'No Data'
    })
  }
});
const slots = useSlots();
const getShowHeader = computed(() => props.header || slots.header);
const getShowFooter = computed(() => props.footer || slots.footer);
const prefixCls = 'as-list';
const classObj = computed(() => ({
  [`${prefixCls}`]: true
  // [`${prefixCls}-vertical`]: props.itemLayout === 'vertical',
  // [`${prefixCls}-${sizeCls.value}`]: sizeCls.value,
  // [`${prefixCls}-split`]: props.split,
  // [`${prefixCls}-bordered`]: props.bordered,
  // [`${prefixCls}-loading`]: isLoading.value,
  // [`${prefixCls}-grid`]: !!props.grid,
  // [`${prefixCls}-rtl`]: direction.value === 'rtl',
}));
const classString = {
  ...classObj.value,
  [`${prefixCls}-something-after-last-item`]: !!getShowFooter.value
};
</script>
<style lang="less" scoped>
@list-prefix-cls: ~'as-list';
.@{list-prefix-cls} {
  position: relative;

  * {
    outline: none;
  }

  &-items {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &-header {
    background: @bg-color;
  }

  &-footer {
    background: @bg-color;
  }

  &-header,
  &-footer {
    padding: 16px 24px;
  }
}
</style>
