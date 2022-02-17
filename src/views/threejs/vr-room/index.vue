<!--
 * @Description: 
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-16 17:32:21
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-17 11:39:01
-->
<template>
  <div id="VR" ref="VRRoom"></div>
</template>
>
<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue';
import VRROOM from './index';
const VRRoom = shallowRef<HTMLElement | undefined>(document.documentElement);

onMounted(() => {
  new VRROOM('#VR', VRRoom.value);
});
</script>
<style lang="less" scoped></style>
