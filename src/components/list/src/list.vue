<!--
 * @Description: List
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 22:49:02
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 10:46:31
-->
<template>
  <div :class="classString">
    <div v-if="getShowHeader" :class="`${prefixCls}-header`">
      <template v-if="header">{{ header }}</template>
      <slot name="header" />
    </div>
    <template v-if="dataSource?.length">
      <ul :class="`${prefixCls}-items`">
        <!-- Record<string, string>[] -->
        <li v-for="(item, index) in dataSource" :key="index">
          <slot name="renderItem" :item="item" :index="index" />
        </li>
      </ul>
    </template>
    <el-empty v-else :description="emptyText"></el-empty>
    <div v-if="getShowFooter" :class="`${prefixCls}-footer`">
      <template v-if="footer">{{ footer }}</template>
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup>
// types
interface Props {
  dataSource?: any[];
  header?: string;
  footer?: string;
  emptyText?: string;
  split?: boolean;
  bordered?: boolean;
}
// default props
const props = withDefaults(defineProps<Props>(), {
  emptyText: 'No Data',
  split: true,
  bordered: false
});
const slots = useSlots();
const getShowHeader = computed<boolean>(() => !!(props.header || slots.header));
const getShowFooter = computed<boolean>(() => !!(props.footer || slots.footer));
const prefixCls = 'as-list';
const classObj = computed(() => ({
  [`${prefixCls}`]: true,
  [`${prefixCls}-vertical`]: true,
  [`${prefixCls}-split`]: props.split,
  [`${prefixCls}-bordered`]: props.bordered
}));
const classString = {
  ...classObj.value,
  [`${prefixCls}-something-after-last-item`]: getShowFooter.value
};
provide('prefixCls', prefixCls);
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
