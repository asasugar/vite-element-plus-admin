<!--
 * @Description: 权限管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:37
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-20 18:11:00
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '12px 12px 2px 12px' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>权限管理</span>
        <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
          <el-button class="button" type="text">{{ role?.value }}</el-button>
        </el-link>
      </div>
    </template>
    <el-tree-v2 :data="data" :props="props" show-checkbox :height="500" />
    <div class="mt20 mb20">
      <el-button class="button" type="primary">保存</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { systemService } from '@/services';
import { IRoutes } from '#/vue-router';
import { ITree } from './typing';
import { ref } from 'vue';

const route = useRoute();

const props = {
  value: 'value',
  label: 'label',
  children: 'children'
};
const data = ref<ITree[]>();
const role = ref();

if (route?.params?.role && typeof route.params.role === 'string') {
  role.value = JSON.parse(route.params.role);
}

const normalizeaTreeData: (data: IRoutes[]) => any = (data: IRoutes[]) => {
  if (data?.length) {
    return data.map(i => {
      if (i?.children?.length) {
        i.children = normalizeaTreeData(i.children);
      }
      return {
        value: i.name,
        label: i.meta?.title ?? i.name,
        children: i.children
      };
    });
  }
  return [];
};
(async function () {
  const routes = await systemService.getRoute();
  data.value = normalizeaTreeData(routes?.[0]?.children);
})();
</script>

<style lang="less" scoped></style>
