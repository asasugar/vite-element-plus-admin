<!--
 * @Description: 首页
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 11:24:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-10-12 11:34:44
-->
<template>
  <el-container class="layout-container">
    <home-aside :menu-option="menuOption" @onJumpMenu="handleToMenu" />
    <el-container>
      <el-header class="home-header flex center between pos-r f12 color-black">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item">
            <span class="color-gray3">{{ item }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="home-toolbar color-gray3">
          <el-dropdown>
            <setting class="mr10 color-gray3" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">注销</el-dropdown-item>
                <el-dropdown-item @click="handleEditPassword">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ userinfo?.username }}</span>
        </div>
      </el-header>
      <el-tabs
        v-if="editableTabs?.length"
        v-model="editableTabsValue"
        closable
        type="card"
        class="demo-tabs"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
      <el-main class="bg-gray">
        <el-backtop target=".el-main"></el-backtop>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAliveInclude">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Setting } from '@element-plus/icons-vue';
import { userService, systemService } from '@/services';
import { setStorage, getStorage } from '@/utils/storage';
import { ITab, IMenu, IMenuItem } from './typing';
import { storeToRefs } from 'pinia';
import { useGlobalStore, useUserStore } from '@/pinia';
import { routes } from '@/router';
import HomeAside from './components/home-aside';
import type { TabPanelName } from 'element-plus';

const useGlobal = useGlobalStore();
const useUser = useUserStore();
const router = useRouter();
const route = useRoute();
useGlobal.keepAliveAction(routes);
const { keepAliveInclude } = storeToRefs(useGlobal);
const menuOption = ref<IMenu>({
  defaultOpeneds: ['1'],
  defaultActive: '1-1',
  menu: []
});
const { userinfo } = storeToRefs(useUser);
const breadcrumb = ref<string[]>([]);
const editableTabsValue = ref(route.path);
const editableTabs = ref<ITab[]>([]);
onBeforeRouteUpdate(to => {
  if (typeof to?.meta?.title === 'string' && !breadcrumb.value.includes(to?.meta?.title)) {
    breadcrumb.value.push(to.meta.title);
    // 存储最新面包屑，左侧菜单选中项，用于刷新时回显
    setStorage('breadcrumb', breadcrumb.value);
    setStorage('menuOption', {
      defaultOpeneds: menuOption.value.defaultOpeneds,
      defaultActive: menuOption.value.defaultActive
    });
  } else {
    const index = breadcrumb.value.findIndex(i => i === to?.meta?.title);
    const storageBreadcrumb = getStorage('breadcrumb');
    if (index > -1) {
      breadcrumb.value = storageBreadcrumb?.slice(0, index + 1);
      index !== storageBreadcrumb?.length - 1 && setStorage('breadcrumb', breadcrumb.value);
    }
  }
});
const handleTabClick = ({ index }: { index: string | undefined }) => {
  if (!index) return;

  const tab = editableTabs.value[~~index];
  if (!tab) return;

  editableTabsValue.value = tab.path;
  menuOption.value.defaultOpeneds = tab.defaultOpeneds;
  menuOption.value.defaultActive = tab.defaultActive;
  breadcrumb.value = tab.breadcrumb;
  router.push({ path: tab.path });
};

const handleTabRemove = (paneName: TabPanelName) => {
  const tabs = editableTabs.value;
  editableTabs.value = tabs.filter(tab => tab.path !== paneName);
  const length = editableTabs.value.length;
  if (length) {
    const prevTab = editableTabs.value[length - 1];
    editableTabsValue.value = prevTab.path;
    breadcrumb.value = prevTab.breadcrumb;
    menuOption.value.defaultOpeneds = prevTab.defaultOpeneds;
    menuOption.value.defaultActive = prevTab.defaultActive;
    router.back();
  } else {
    // 删除tabs为0时，重置跳回首页
    menuOption.value.defaultOpeneds = ['1'];
    menuOption.value.defaultActive = '1-1';
    breadcrumb.value = ['Dashboard', '分析页'];
    router.push({ path: '/dashboard/analysis' });
  }
};

// 刷新时渲染选中的菜单项
const _renderDefaultMenuActive = (menu: IMenuItem[], sortId?: string, title?: string) => {
  if (route.name) {
    let isFindInMenu = false;
    (function recursiveFn(list: IMenuItem[], id?: string, text?: string) {
      list.some(item => {
        if (item.name === route.name) {
          nextTick(() => {
            menuOption.value.defaultOpeneds = [`${id ? id : item.sortId}`];
            menuOption.value.defaultActive = item.sortId;
            breadcrumb.value = text ? [text, item.title] : [item.title];
            // push tab分页栏
            editableTabs.value.push({
              title: route.meta.title as string,
              path: route.path,
              defaultOpeneds: menuOption.value.defaultOpeneds,
              defaultActive: menuOption.value.defaultActive,
              breadcrumb: breadcrumb.value
            });
          });
          isFindInMenu = true;
          return true;
        }
        if (item.children?.length) {
          recursiveFn(item.children, item.sortId, item.title);
        }
      });
    })(menu, sortId, title);
    if (!isFindInMenu) {
      nextTick(() => {
        const storageBreadcrumb = getStorage('breadcrumb');
        const index = storageBreadcrumb?.findIndex((i: string) => i === route?.meta?.title);
        if (index > -1) {
          breadcrumb.value = storageBreadcrumb?.slice(0, index + 1);
          index !== storageBreadcrumb?.length - 1 && setStorage('breadcrumb', breadcrumb.value);
        }
        menuOption.value.defaultOpeneds = getStorage('menuOption')?.defaultOpeneds;
        menuOption.value.defaultActive = getStorage('menuOption')?.defaultActive;
      });
    }
  }
};
// 当前路由在菜单中没有找到则取localStorage缓存

// 获取菜单列表
(async function getMenu() {
  const content = await systemService.getMenu();
  menuOption.value.menu = content;
  if (content) {
    _renderDefaultMenuActive(content);
  }
})();

// 注销
const handleLogout = async () => {
  const content = await userService.logoutAction();
  if (content) {
    router.replace({ name: 'Login' });
  }
};

// 修改密码
const handleEditPassword = () => {
  router.push({ name: 'SystemPassword' });
};

// 去二级菜单页
const handleToMenu = (
  item: { title: string; sortId: string },
  subItem: { title: string; sortId: string; name: string; path: string }
) => {
  breadcrumb.value = [item.title];
  menuOption.value.menu;
  menuOption.value.defaultOpeneds = [item.sortId];
  menuOption.value.defaultActive = subItem.sortId;
  if (subItem.title && subItem.path) {
    let isExist = !!editableTabs.value.find(i => i.title === subItem.title);
    editableTabsValue.value = subItem.path;
    if (!isExist) {
      editableTabs.value.push({
        title: subItem.title,
        defaultOpeneds: menuOption.value.defaultOpeneds,
        defaultActive: menuOption.value.defaultActive,
        breadcrumb: breadcrumb.value,
        path: subItem.path
      });
    }
  }
  if (subItem.name) {
    router.push({ name: subItem.name });
  } else if (subItem.path) {
    router.push({ path: subItem.path });
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

  .home-toolbar {
    display: inline-flex;
    align-items: flex-end;
  }

  .home-header {
    background-image: linear-gradient(25deg, @bg-color, @theme-color);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
