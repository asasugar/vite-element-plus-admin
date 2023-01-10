<!--
 * @Description: VR 看房
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-16 17:32:21
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 11:04:09
-->
<template>
  <div id="VR" ref="vrRoomRef"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import VrRoom from './index';
const vrRoomRef = $shallowRef<HTMLElement | undefined>(document.documentElement);

onMounted(() => {
  new VrRoom('#VR', vrRoomRef);
});
</script>
<style lang="less" scoped></style>
