<!--
 * @Description: VR 看房
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-16 17:32:21
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-13 18:44:34
-->
<template>
  <div id="VR" ref="vrRoomRef"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import VrRoom from './index';
const vrRoomRef = shallowRef<HTMLElement | undefined>(document.documentElement);

onMounted(() => {
  new VrRoom('#VR', vrRoomRef.value);
});
</script>
<style lang="less" scoped></style>
