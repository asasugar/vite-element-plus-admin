<!--
 * @Description: 首页
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 11:24:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-27 13:55:36
-->
<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          :default-openeds="menuOption.defaultOpeneds"
          :default-active="menuOption.defaultActive"
        >
          <el-sub-menu v-for="item in menuOption.menu" :key="item.sortId" :index="item.sortId">
            <template #title>{{ item.title }}</template>
            <template v-if="item.children">
              <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.sortId"
                :index="subItem.sortId"
                @click="handleToMenu(subItem, item.title, subItem.title)"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="flex center between pos-r f12 bg-theme color-white">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item">
            <span class="color-white">{{ item }}</span>
          </el-breadcrumb-item>
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
          <span>{{ user.username }}</span>
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
import { ref, reactive, nextTick } from 'vue';
import { useRouter, useRoute, RouteRecordName } from 'vue-router';
import { Setting } from '@element-plus/icons-vue';
import { useState } from '@/hooks/vuex-composition-helpers';
import { userService, systemService } from '@/services';

const router = useRouter();
const route = useRoute();

const menuOption: {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: any;
} = reactive({
  defaultOpeneds: ['1'],
  defaultActive: '1-1',
  menu: []
});
const { userinfo } = useState('user', ['userinfo']);
const user = ref(userinfo());
const breadcrumb = ref<string[]>([]);

// 刷新时渲染选中的菜单项
const _renderDefaultMenuActive = (
  menu: {
    name: RouteRecordName | null | undefined;
    sortId: string;
    title: string;
    children?: [];
  }[],
  sortId?: string,
  title?: string
) => {
  if (route.name) {
    menu.some(item => {
      if (item.name === route.name) {
        nextTick(() => {
          menuOption.defaultOpeneds = [`${sortId ? sortId : item.sortId}`];
          menuOption.defaultActive = item.sortId;
          breadcrumb.value = title ? [title, item.title] : [item.title];
        });
        return true;
      }
      if (item.children?.length) {
        _renderDefaultMenuActive(item.children, item.sortId, item.title);
      }
    });
  }
};
// 获取菜单列表
const getMenu = async () => {
  const content = await systemService.getMenu();
  menuOption.menu = content;
  if (content) {
    _renderDefaultMenuActive(content);
  }
};
getMenu();

// 注销
const handleLogout = async () => {
  const content = await userService.logoutAction();
  if (content) {
    router.replace({ name: 'Login' });
  }
};
// 去二级菜单页
const handleToMenu = (item: { name: string; path: string }, title: string, subTitle: string) => {
  breadcrumb.value = [title, subTitle];
  if (item.name) {
    router.push({ name: item.name });
  } else if (item.path) {
    router.push({ path: item.path });
  }
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
