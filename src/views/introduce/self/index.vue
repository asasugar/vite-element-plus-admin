<!--
 * @Description: 自我介绍
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-11-23 16:04:07
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-09 20:29:47
-->
<template>
  <AsPageWrapper>
    <template #bodyContent>
      <el-descriptions title="About me" :column="3" border>
        <el-descriptions-item>
          <template #label>
            <div class="flex verticalcenter">
              <i-ep-user class="mr10 color-gray3" />
              Username
            </div>
          </template>
          asasugar
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="flex verticalcenter">
              <i-ep-message class="mr10 color-gray3" />
              Email
            </div>
          </template>
          xxj95719@gmail.com / xuexiongjie@aliyun.com
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="flex verticalcenter">
              <i-ep-location class="mr10 color-gray3" />
              Place
            </div>
          </template>
          Xiamen
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="flex verticalcenter">
              <i-ep-chat-round class="mr10 color-gray3" />
              Wechat
            </div>
          </template>
          xxj95719
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="flex verticalcenter">
              <i-ep-tickets class="mr10 color-gray3" />
              Hobby
            </div>
          </template>
          <template v-for="item in hobbyList" :key="item">
            <el-tag size="small" class="mr5">{{ item }}</el-tag>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';

const hobbyList = reactive<string[]>(['New technology', 'Car', 'LOL']);
</script>

<style lang="less" scoped></style>
