<!--
 * @Description: 页面布局容器
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-26 16:06:39
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:10:03
-->
<template>
  <div class="page-wrapper">
    <div
      v-if="getShowHeader"
      class="page-wrapper-header"
      :class="{ 'flex between verticalcenter': getShowExtra }"
    >
      <template v-if="getShowDefaultHeader">
        <div v-if="headerTitle">{{ headerTitle }}</div>
        <div v-if="headerContent">{{ headerContent }}</div>
      </template>
      <slot v-else name="headerContent"></slot>
      <slot v-if="getShowExtra" name="extra"></slot>
    </div>

    <el-card class="page-wrapper-content" :body-style="{ padding: bodyPadding }">
      <slot name="bodyContent"></slot>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  headerTitle?: string;
  headerContent?: string;
  bodyPadding?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bodyPadding: '12px 12px 12px 12px'
});

const slots = useSlots();

const getShowDefaultHeader = computed<boolean>(() => !!(props.headerTitle || props.headerContent));
const getShowHeader = computed<boolean>(
  () => !!(getShowDefaultHeader.value || slots?.headerContent)
);
const getShowExtra = computed<boolean>(() => !!slots?.extra);
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
