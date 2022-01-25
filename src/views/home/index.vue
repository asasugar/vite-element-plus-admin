<!--
 * @Description: 首页
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 11:24:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-25 17:08:45
-->
<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>Dashboard</template>
            <el-menu-item :route="{ name: 'DashboardAnalysis' }" @click="handleToAnalysis"
              >分析</el-menu-item
            >
            <el-menu-item>工作台</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>Navigator Two</template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>Navigator Three</template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="flex center between pos-r f12 bg-theme color-white">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="color-white">homepage</el-breadcrumb-item>
          <!-- <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread">
            {{ breadsName[bread] }}
          </el-breadcrumb-item>-->
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="toolbar">
          <el-dropdown>
            <setting color="#fff" class="mr10" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main class="bg-gray">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
// import { ElNotification } from 'element-plus';
// import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { Setting } from '@element-plus/icons-vue';
import { useActions } from '@/hooks/vuex-composition-helpers';
import { userService } from '@/services';

// const store = useStore();
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  const content = await userService.logoutAction();
  if (content) {
    router.replace({ name: 'Login' });
  }
};
// const matched = route.matched;
const handleToAnalysis = () => {
  router.push({ name: 'DashboardAnalysis' });
};
</script>
<style lang="less" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    width: 240px;
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
  .toolbar {
    display: inline-flex;
    align-items: center;
  }
}
</style>
