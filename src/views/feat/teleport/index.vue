<!--
 * @Description: 怎么使用useTeleport
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-11-24 17:30:47
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:12:57
-->
<template>
  <AsPageWrapper header-title="useTeleport演示">
    <template #bodyContent>
      <div class="flex verticalcenter">
        <el-button type="primary" @click="showTeleport"> show </el-button>
        <el-button type="primary" @click="hideTeleport"> hide </el-button>
        <el-button type="primary" @click="toggleTeleport"> toggle </el-button>
        <as-vnode-template :vnodes="renderTeleport"></as-vnode-template>
      </div>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useTeleport } from '@/hooks/use-teleport';
import AsVnodeTemplate from '@/components/vnode-template';

const AXIOM = 'Teleport text!';
const appendToBody = ref<boolean>(true);
const { showTeleport, hideTeleport, renderTeleport } = useTeleport(
  () => h('div', AXIOM),
  appendToBody
);
const toggleTeleport = () => {
  appendToBody.value = !appendToBody.value;
};
</script>

<style lang="less" scoped></style>
