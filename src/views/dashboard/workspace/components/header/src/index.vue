<!--
 * @Description: 工作台-header-菜单组件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-01 11:30:54
-->
<template>
  <div class="flex verticalcenter">
    <el-avatar :src="userinfo?.avatar || headerImg" :size="72" />
    <div class="flex column hoscenter ml30">
      <span class="f20 pb10">早安, {{ userinfo?.username }}, 开始您一天的工作吧！</span>
      <span class="f14 color-gray6">今日晴，20℃ - 32℃！</span>
    </div>
    <div class="flex flex__item end">
      <div class="flex column hoscenter text-right w100">
        <span class="f16 color-gray6 pb5">待办</span>
        <span class="f24">2/10</span>
      </div>

      <div class="flex column hoscenter text-right w100">
        <span class="f16 color-gray6 pb5">项目</span>
        <span class="f24">8</span>
      </div>
      <div class="flex column hoscenter text-right w100">
        <span class="f16 color-gray6 pb5">团队</span>
        <span class="f24">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/pinia';

import headerImg from '@/assets/g.jpeg';

const useUser = useUserStore();
const { userinfo } = storeToRefs(useUser);
</script>

<style lang="less" scoped></style>
