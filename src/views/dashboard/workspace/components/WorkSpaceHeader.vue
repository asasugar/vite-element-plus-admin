<!--
 * @Description: 工作台-菜单组件
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-21 18:27:06
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-26 17:15:33
-->
<template>
  <div class="flex verticalcenter">
    <el-avatar :src="userinfo.avatar || headerImg" :size="72" />
    <div class="flex column hoscenter ml30">
      <span class="f20 pb10">早安, {{ userinfo.realName }}, 开始您一天的工作吧！</span>
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
import { computed } from 'vue';
import { useState } from '@/hooks/vuex-composition-helpers';
import { useStore } from 'vuex';

const store = useStore();
const headerImg = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
const r = useState('user', ['userinfo']);
console.log(123, r.userinfo(), store.state.user);
// const userStore = useUserStore();
const userinfo = computed(() => ({ avatar: '', realName: '' }));
</script>

<style lang="less" scoped></style>
