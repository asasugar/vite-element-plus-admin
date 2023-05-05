<!--
 * @Description: 用户管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-05-05 10:22:02
-->
<template>
  <as-page-wrapper header-title="用户管理">
    <template #extra>
      <div class="flex center">
        <el-button type="primary" @click="handleInsert">新增用户</el-button>
        <el-button type="primary" @click="handleExportExcel({ keyMap, orderedKey, scope })"
          >导出excel</el-button
        >
        <el-input v-model="search" class="ml10" placeholder="User to search" />
        <AsTableSettings @on-refresh="handleRefresh" @on-size="handleCommand" />
      </div>
    </template>
    <template #bodyContent>
      <el-table
        v-loading="loading"
        :data="filterTableData"
        border
        :size="size"
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="55" />
        <el-table-column prop="userName" label="用户名" width="180" />
        <el-table-column prop="email" sortable label="邮箱" />
        <el-table-column prop="createTime" sortable label="创建时间" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <span class="pl10">{{ scope.row.role.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="确定删除该用户？"
              icon-color="red"
              @confirm="handleDel(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="pageNum"
        v-model:page-size="pageSize"
        class="text-right mt20 mb20"
        background
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </as-page-wrapper>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { AsPageWrapper } from '@/containers/page-wrapper';
import AsTableSettings from '@/components/table-settings';
import { useUserStore } from '@/pinia';
import { useTable } from '@/hooks/use-table';
import { useData } from './hooks/use-data';
import type { UserContent } from '@/apis/user/typing';

const router = useRouter();

const keyMap = {
  id: '序号',
  userName: '用户名',
  email: '邮箱',
  role: '角色',
  createTime: '创建时间'
};
const orderedKey = ['id', 'userName', 'role', 'email', 'createTime'];
const scope = {
  role: 'value'
};
const { loading, tableData, totalNum, getUserList } = useData();
const {
  size,
  search,
  filterTableData,
  pageNum,
  pageSize,
  handleCommand,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleRefresh,
  handleExportExcel,
  handleDel
} = useTable<UserContent>({
  tableData,
  totalNum,
  getTableData: getUserList,
  searchFilterConditions: (data: UserContent) =>
    !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
});

const handleInsert = () => {
  router.push({ name: 'SystemUserInsert' });
};

const handleEdit = (item: UserContent) => {
  if (!item) return;
  const { setUpdateUserItem } = useUserStore();
  setUpdateUserItem(item);
  router.push({ name: 'SystemUserEdit' });
};
</script>
