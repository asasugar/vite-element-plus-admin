<!--
 * @Description: 页面布局容器-main(无限滚动)
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 15:10:53
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 17:10:14
-->
<template>
  <div v-infinite-scroll="bottomLoad" class="infinite-scroll-main" :style="{ height }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  height: string;
}

withDefaults(defineProps<Props>(), {
  height: '300px'
});

const emit = defineEmits(['load']);

const bottomLoad = () => {
  emit('load');
};
</script>
<style lang="less" scoped>
.infinite-scroll-main {
  padding: 0;
  margin: 0;
  overflow: auto;
}
</style>
