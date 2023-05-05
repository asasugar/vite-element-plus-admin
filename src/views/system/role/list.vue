<!--
 * @Description: 角色管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-05-05 10:45:32
-->
<template>
  <as-page-wrapper header-title="角色管理">
    <template #extra>
      <div class="flex center">
        <el-button type="primary" @click="handleInsert">新增角色</el-button>
        <el-button
          type="primary"
          @click="handleExportExcel({ excelData, keyMap, orderedKey, scope })"
          >导出excel</el-button
        >
        <el-input v-model="search" class="ml10" placeholder="Role to search" />
        <AsTableSettings @on-refresh="handleRefresh" @on-size="handleCommand" />
      </div>
    </template>
    <template #bodyContent>
      <el-table
        ref="multipleTableRef"
        v-loading="loading"
        :data="filterTableData"
        border
        :size="size"
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="序号" width="80" sortable />
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
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.status" disabled></el-switch>
            <span class="pl10">{{ scope.row.status ? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" sortable label="创建时间" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="handleEditAuth(scope.row)"
              >权限配置</el-button
            >
            <el-popconfirm
              title="确定删除该角色？"
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
import { useRoleStore } from '@/pinia';
import { useTable } from '@/hooks/use-table';
import { useData } from './hooks/use-data';
import type { RoleContent } from '@/apis/user/typing';

const router = useRouter();
const { loading, tableData, totalNum, getRoleList } = useData();
const {
  size,
  search,
  filterTableData,
  multipleSelection,
  pageNum,
  pageSize,
  handleCommand,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleRefresh,
  handleExportExcel,
  handleDel
} = useTable<RoleContent>({
  tableData,
  totalNum,
  getTableData: getRoleList,
  searchFilterConditions: (data: RoleContent) =>
    !search.value ||
    data.role.key.toLowerCase().includes(search.value.toLowerCase()) ||
    data.role.value.toLowerCase().includes(search.value.toLowerCase())
});

const keyMap = {
  id: '序号',
  status: '状态',
  role: '角色',
  createTime: '创建时间',
  remark: '备注'
};
const orderedKey = ['id', 'role', 'status', 'createTime', 'remark'];
const scope = {
  role: 'value'
};
const excelData = multipleSelection.value.map(i => {
  i.status = i.status ? '启用' : ('禁用' as any);
  return i;
});

const handleInsert = () => {
  router.push({ name: 'SystemRoleInsert' });
};

const handleEdit = (item: RoleContent) => {
  if (!item) return;
  const { setUpdateRoleItem } = useRoleStore();
  setUpdateRoleItem(item);
  router.push({ name: 'SystemRoleEdit' });
};

const handleEditAuth = (item: RoleContent) => {
  if (!item) return;

  const { setRoleAuth } = useRoleStore();
  setRoleAuth(item.role);
  router.push({ name: 'SystemAuth' });
};
</script>
