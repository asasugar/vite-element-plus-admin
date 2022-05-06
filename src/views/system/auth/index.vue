<!--
 * @Description: 权限管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:37
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-05-06 14:40:04
-->
<template>
  <as-page-wrapper header-title="权限管理">
    <template #extra>
      <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
        <el-button class="button" type="text">{{ role?.value }}</el-button>
      </el-link>
    </template>
    <template #bodyContent>
      <el-tree-v2 :data="data" :props="props" show-checkbox :height="500" />
      <div class="mt20 mb20">
        <el-button class="button" type="primary" @click="handleSaveAuth">保存</el-button>
      </div>
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { systemService } from '@/services';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { IRoutes } from '#/vue-router';
import { ITree } from './typing';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

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
    console.log(111, data);
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

const handleSaveAuth = () => {
  router.back();
};
</script>
