<!--
 * @Description: 角色管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-29 14:48:30
-->
<template>
  <el-card
    v-if="route.name === 'SystemRole'"
    class="card-wrapper"
    :body-style="{ padding: '12px 12px 2px 12px' }"
  >
    <template #header>
      <div class="flex between verticalcenter">
        <span>角色管理</span>
        <div class="flex center">
          <el-button type="primary" @click="handleInsert">新增角色</el-button>
          <el-input v-model="search" class="ml10" placeholder="Role to search" />
        </div>
      </div>
    </template>
    <el-table :data="filterTableData" border highlight-current-row style="width: 100%">
      <el-table-column prop="role" label="角色名称">
        <template #default="scope">
          <span class="pl10">{{ scope.row.role.value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色值">
        <template #default="scope">
          <span class="pl10">{{ scope.row.role.key }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sortId" sortable label="排序" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status"></el-switch>
          <span class="pl10">{{ scope.row.status ? '已启用' : '已禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable label="创建时间" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除该角色？"
            icon-color="red"
            @confirm="handleDel(scope.row.sortId)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      class="text-right mt20 mb20"
      background
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
  <!-- 新增或者编辑用户角色子路由 -->
  <router-view v-else></router-view>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { systemService } from '@/services';
import { Product } from './typing';

const router = useRouter();
const route = useRoute();

const tableData = ref<Product[]>();
const search = ref<string>('');
const currentPage = ref<number>(1);
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const totalNum = ref<number>(0);

const getRoleList = async (pageNum, pageSize) => {
  const { total, content } = await systemService.getRoleList({
    pageNum,
    pageSize
  });
  totalNum.value = total;
  tableData.value = content;
};
getRoleList(pageNum.value, pageSize.value);

const filterTableData = computed(() =>
  tableData?.value?.filter(
    data =>
      !search.value ||
      data.role.key.toLowerCase().includes(search.value.toLowerCase()) ||
      data.role.value.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleSizeChange = (val: number) => {
  pageNum.value = 1;
  pageSize.value = val;
  getRoleList(pageNum.value, pageSize.value);

  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  pageNum.value = val;
  getRoleList(pageNum.value, pageSize.value);
  console.log(`current page: ${val}`);
};

const handleInsert = () => {
  router.push({ name: 'SystemRoleInsert' });
};

const handleEdit = item => {
  if (!item) return;
  router.push({ name: 'SystemRoleEdit', params: { data: JSON.stringify(item) } });
};

const handleDel = sortId => {
  tableData.value = filterTableData.value?.filter(data => data.sortId !== sortId);
  return true;
};
</script>
