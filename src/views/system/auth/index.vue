<!--
 * @Description: 权限管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:37
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-24 17:57:26
-->
<template>
  <as-page-wrapper header-title="权限管理">
    <template #bodyContent>
      <el-tree-v2 :data="authTree" :props="props" show-checkbox :height="500" />
      <div class="mt20 mb20">
        <el-button class="button" type="primary" @click="handleSaveAuth">保存</el-button>
      </div>
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { systemService } from '@/services';
import { AsPageWrapper } from '@/containers/page-wrapper';
import type { AuthTree } from './typing';
import type { ApiGetRouteRes } from '@/apis/system/typing';

const router = useRouter();

const props = {
  value: 'value',
  label: 'label',
  children: 'children'
};
const authTree = ref<AuthTree[]>();

const normalizeaTreeData = (data?: ApiGetRouteRes): AuthTree[] => {
  if (data?.length) {
    return data.map((i: any) => {
      if (i?.children?.length) {
        i.children = normalizeaTreeData(i.children);
      }
      return {
        value: i.name,
        label: i.meta?.title ?? i.name,
        children: i.children as AuthTree['children']
      };
    });
  }
  return [];
};
(async function () {
  const routes = await systemService.getRoute();
  authTree.value = normalizeaTreeData(routes?.[0]?.children);
})();

const handleSaveAuth = () => {
  router.back();
};
</script>
