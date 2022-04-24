<!--
 * @Description: 角色管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:22
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-24 18:14:49
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
          <el-button type="primary" @click="handleExportExcel">导出excel</el-button>
          <el-input v-model="search" class="ml10" placeholder="Role to search" />
          <AsTableSettings @onRefresh="handleRefresh" @onSize="handleCommand" />
        </div>
      </div>
    </template>
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
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="handleEditAuth(scope.row)"
            >权限配置</el-button
          >
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
    />
  </el-card>
  <!-- 新增或者编辑用户角色子路由 -->
  <router-view v-else> </router-view>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Json2excel from 'custom-json2excel';
import { userService } from '@/services';
import { IRole } from './typing';
import { IPage, TableInstance } from '#/global';
import { ElMessage } from 'element-plus';
import AsTableSettings from '@/components/table-settings';

const router = useRouter();
const route = useRoute();

const tableData = ref<IRole[]>([]);
const size = ref<string>('default');
const search = ref<string>('');
const currentPage = ref<number>(1);
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const totalNum = ref<number>(0);
const loading = ref(true);
const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref<IRole[]>([]);

const getRoleList = async (pageNum: number, pageSize: number) => {
  loading.value = true;
  const { total, content } = await userService.getRoleList<IPage>({
    pageNum,
    pageSize
  });
  loading.value = false;
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

const handleSelectionChange = (val: IRole[]) => {
  multipleSelection.value = val;
};

const reset = () => {
  tableData.value.length = 0;
  search.value = '';
  currentPage.value = 1;
  pageNum.value = 1;
  pageSize.value = 10;
  totalNum.value = 0;
  loading.value = true;
  multipleSelection.value.length = 0;
};

const handleRefresh = () => {
  reset();
  getRoleList(pageNum.value, pageSize.value);
};

const handleCommand = (command: string) => {
  if (size.value === command || !command) return;
  size.value = command;
};

const handleExportExcel = () => {
  if (multipleSelection.value?.length) {
    const keyMap = {
      userName: '用户名',
      email: '邮箱',
      role: '角色',
      createTime: '创建时间'
    };
    const orderedKey = ['id', 'role', 'email', 'createTime'];
    const scope = {
      role: 'value'
    };

    const json2excel = new Json2excel({
      data: multipleSelection.value,
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

const handleEdit = (item: IRole) => {
  if (!item) return;
  router.push({ name: 'SystemRoleEdit', params: { data: JSON.stringify(item) } });
};

const handleEditAuth = (item: IRole) => {
  if (!item) return;
  router.push({ name: 'SystemAuth', params: { role: JSON.stringify(item.role) } });
};

const handleDel = (sortId: number | undefined) => {
  tableData.value = filterTableData.value?.filter(data => data.sortId !== sortId);
  return true;
};
</script>
