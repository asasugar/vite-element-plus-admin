<!--
 * @Description: 角色管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 14:28:25
-->
<template>
  <as-page-wrapper header-title="角色管理">
    <template #extra>
      <div class="flex center">
        <el-button type="primary" @click="handleInsert">新增角色</el-button>
        <el-button type="primary" @click="handleExportExcel">导出excel</el-button>
        <el-input v-model="search" class="ml10" placeholder="Role to search" />
        <AsTableSettings @onRefresh="handleRefresh" @on-size="handleCommand" />
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
import { useRoleStore } from '@/pinia';
import type { EpPropMergeType } from 'element-plus/es/utils';
import type { RoleContent, ApiGetRoleListRes } from '@/apis/user/typing';

const router = useRouter();

const tableData = ref<ApiGetRoleListRes['content']>([]);
const size =
  ref<EpPropMergeType<StringConstructor, '' | 'default' | 'small' | 'large', never>>('default');
const search = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const totalNum = ref<number>(0);
const loading = ref<boolean>(true);
const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref<ApiGetRoleListRes['content']>([]);
let pageNum = 1;

const getRoleList = async (pageNum: number, pageSize: number) => {
  loading.value = true;
  const content = await userService.getRoleList({
    pageNum,
    pageSize
  });
  if (content) {
    const { total, content: tableContent } = content;
    loading.value = false;
    totalNum.value = total;
    tableData.value = tableContent;
  }
};
getRoleList(pageNum, pageSize.value);

const filterTableData = computed(() =>
  tableData.value?.filter(
    data =>
      !search.value ||
      data.role.key.toLowerCase().includes(search.value.toLowerCase()) ||
      data.role.value.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleSizeChange = (val: number) => {
  pageNum = 1;
  pageSize.value = val;
  getRoleList(pageNum, pageSize.value);

  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  pageNum = val;
  getRoleList(pageNum, pageSize.value);
  console.log(`current page: ${val}`);
};

const handleSelectionChange = (val: ApiGetRoleListRes['content']) => {
  multipleSelection.value = val;
};

const reset = () => {
  tableData.value.length = 0;
  search.value = '';
  currentPage.value = 1;
  pageNum = 1;
  pageSize.value = 10;
  totalNum.value = 0;
  loading.value = true;
  multipleSelection.value.length = 0;
};

const handleRefresh = () => {
  reset();
  getRoleList(pageNum, pageSize.value);
};

const handleCommand = (
  command: EpPropMergeType<StringConstructor, 'default' | 'small' | 'large', never>
) => {
  if (size.value === command || !command) return;
  size.value = command;
};

const handleExportExcel = () => {
  if (multipleSelection.value?.length) {
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

const handleDel = (id: number | undefined) => {
  tableData.value = filterTableData.value?.filter(data => data.id !== id);
  return true;
};
</script>
