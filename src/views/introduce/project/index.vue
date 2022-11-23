<!--
 * @Description: 项目介绍
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-11-23 16:04:07
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-11-23 17:16:22
-->
<template>
  <AsPageWrapper header-title="项目介绍">
    <template #bodyContent>
      <el-descriptions
        v-for="(val, key) in packageJson"
        :key="key"
        class="mt15"
        :title="key"
        :column="3"
        border
      >
        <el-descriptions-item v-if="isString(val)">
          <template #label>
            <div class="cell-item">
              {{ key }}
            </div>
          </template>
          {{ val }}
        </el-descriptions-item>
        <el-descriptions-item v-for="(subVal, subKey) in val" v-else :key="subKey">
          <template #label>
            <div class="cell-item">
              {{ subKey }}
            </div>
          </template>
          {{ subVal }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
import packageJson from '../../../../package.json';
import { isString } from '@/utils/is';
</script>

<style lang="less" scoped></style>
