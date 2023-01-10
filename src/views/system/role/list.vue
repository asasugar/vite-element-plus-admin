<!--
 * @Description: 角色管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-09 19:11:31
-->
<template>
  <as-page-wrapper header-title="角色管理">
    <template #extra>
      <div class="flex center">
        <el-button type="primary" @click="handleInsert">新增角色</el-button>
        <el-button type="primary" @click="handleExportExcel">导出excel</el-button>
        <el-input v-model="search" class="ml10" placeholder="Role to search" />
        <AsTableSettings @onRefresh="handleRefresh" @onSize="handleCommand" />
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
        v-model:currentPage="currentPage"
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
import Json2excel from '@asasugar-use/custom-json2excel';
import { userService } from '@/services';
import { ElMessage } from 'element-plus';
import { AsPageWrapper } from '@/containers/page-wrapper';
import AsTableSettings from '@/components/table-settings';
import type { RoleItem, RoleResult } from './typing';
import type { Page } from '#/global';

const router = useRouter();

let tableData = $ref<RoleItem[]>([]);
let size = $ref<string>('default');
let search = $ref<string>('');
let currentPage = $ref<number>(1);
let pageNum = 1;
let pageSize = $ref<number>(10);
let totalNum = $ref<number>(0);
let loading = $ref(true);
let multipleTableRef = $ref<TableInstance>();
let multipleSelection = $ref<RoleItem[]>([]);

const getRoleList = async (pageNum: number, pageSize: number) => {
  loading = true;
  const { total, content }: RoleResult = await userService.getRoleList<Page>({
    pageNum,
    pageSize
  });
  loading = false;
  totalNum = total;
  tableData = content;
};
getRoleList(pageNum, pageSize);

const filterTableData = $computed(() =>
  tableData?.filter(
    data =>
      !search ||
      data.role.key.toLowerCase().includes(search.toLowerCase()) ||
      data.role.value.toLowerCase().includes(search.toLowerCase())
  )
);

const handleSizeChange = (val: number) => {
  pageNum = 1;
  pageSize = val;
  getRoleList(pageNum, pageSize);

  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  pageNum = val;
  getRoleList(pageNum, pageSize);
  console.log(`current page: ${val}`);
};

const handleSelectionChange = (val: RoleItem[]) => {
  multipleSelection = val;
};

const reset = () => {
  tableData.length = 0;
  search = '';
  currentPage = 1;
  pageNum = 1;
  pageSize = 10;
  totalNum = 0;
  loading = true;
  multipleSelection.length = 0;
};

const handleRefresh = () => {
  reset();
  getRoleList(pageNum, pageSize);
};

const handleCommand = (command: string) => {
  if (size === command || !command) return;
  size = command;
};

const handleExportExcel = () => {
  if (multipleSelection?.length) {
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
    const excelData = multipleSelection.map(i => {
      i.status = i.status ? '启用' : '禁用';
      return i;
    });
    const json2excel = new Json2excel({
      data: excelData,
      orderedKey,
      keyMap,
      scope,
      onStart: () => {
        console.log('开始');
      },
      onSuccess: () => {
        console.log('成功');
      },
      onError: err => {
        console.log(err);
      }
    });
    json2excel.generate();
  } else {
    ElMessage({ message: '请勾选需要导出的数据！', type: 'warning' });
  }
};

const handleInsert = () => {
  router.push({ name: 'SystemRoleInsert' });
};

const handleEdit = (item: RoleItem) => {
  if (!item) return;
  router.push({ name: 'SystemRoleEdit', params: { data: JSON.stringify(item) } });
};

const handleEditAuth = (item: RoleItem) => {
  if (!item) return;
  router.push({ name: 'SystemAuth', params: { role: JSON.stringify(item.role) } });
};

const handleDel = (id: number | undefined) => {
  tableData = filterTableData?.filter(data => data.id !== id);
  return true;
};
</script>
