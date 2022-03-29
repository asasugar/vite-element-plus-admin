<!--
 * @Description: 首页
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-20 11:24:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 14:40:31
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
                @click="handleToMenu(subItem, item.title)"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

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
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ user.username }}</span>
        </div>
      </el-header>

      <el-main class="bg-gray">
        <!-- <el-scrollbar> 跟 el-backtop冲突-->
        <el-backtop target=".el-main"></el-backtop>
        <router-view></router-view>
        <!-- </el-scrollbar> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Setting } from '@element-plus/icons-vue';
import { useState } from 'vuex-composition-maphooks';
import { userService, systemService } from '@/services';
import { setStorage, getStorage } from '@/utils/storage';

// types
interface IMenuItem {
  sortId: string;
  title: string;
  name: string;
  path: string;
  children?: IMenuItem[];
}

const router = useRouter();
const route = useRoute();

const menuOption: {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: IMenuItem[];
} = reactive({
  defaultOpeneds: ['1'],
  defaultActive: '1-1',
  menu: []
});
const { userinfo } = useState('user', ['userinfo']);
const user = ref<{ username: string }>(userinfo() || { username: '' });
const breadcrumb = ref<string[]>([]);
onBeforeRouteUpdate(to => {
  if (typeof to?.meta?.title === 'string' && !breadcrumb.value.includes(to?.meta?.title)) {
    breadcrumb.value.push(to.meta.title);
    // 存储最新面包屑，用于刷新时回显
    setStorage('breadcrumb', breadcrumb.value);
  }
});

// 刷新时渲染选中的菜单项
const _renderDefaultMenuActive = (menu: IMenuItem[], sortId?: string, title?: string) => {
  if (route.name) {
    let isFindInMenu = false;
    (function recursiveFn(list: IMenuItem[], id?: string, text?: string) {
      list.some(item => {
        if (item.name === route.name) {
          nextTick(() => {
            menuOption.defaultOpeneds = [`${id ? id : item.sortId}`];
            menuOption.defaultActive = item.sortId;
            breadcrumb.value = text ? [text, item.title] : [item.title];
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
      breadcrumb.value = getStorage('breadcrumb');
    }
  }
};
// 当前路由在菜单中没有找到则取localStorage缓存

// 获取菜单列表
(async function getMenu() {
  const content = await systemService.getMenu();
  menuOption.menu = content;
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
// 去二级菜单页
const handleToMenu = (item: { name: string; path: string }, title: string) => {
  breadcrumb.value = [title];
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
  .home-toolbar {
    display: inline-flex;
    align-items: flex-end;
  }
  .home-header {
    background-image: linear-gradient(25deg, @bg-color, @theme-color);
  }
}
</style>
