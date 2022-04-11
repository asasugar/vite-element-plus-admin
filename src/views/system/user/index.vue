<!--
 * @Description: 用户管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-11 18:20:12
-->
<template>
  <el-card
    v-if="route.name === 'SystemUser'"
    class="card-wrapper"
    :body-style="{ padding: '12px 12px 2px 12px' }"
  >
    <template #header>
      <div class="flex between verticalcenter">
        <span>用户管理</span>
        <div class="flex center">
          <el-button type="primary" @click="handleInsert">新增用户</el-button>
          <el-input v-model="search" class="ml10" placeholder="User to search" />
        </div>
      </div>
    </template>
    <el-table :data="filterTableData" border highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="序号" />
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
  <!-- 新增或者编辑用户子路由 -->
  <router-view v-else> </router-view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { userService } from '@/services';
import { IPage } from '#/global';
import { IUser } from './typing';

const router = useRouter();
const route = useRoute();

const tableData = ref<IUser[]>();
const search = ref<string>('');
const currentPage = ref<number>(1);
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const totalNum = ref<number>(0);

const getUserList = async (pageNum: number, pageSize: number) => {
  const { total, content } = await userService.getUserList<IPage>({
    pageNum,
    pageSize
  });
  totalNum.value = total;
  tableData.value = content;
};
getUserList(pageNum.value, pageSize.value);

const filterTableData = computed(() =>
  tableData?.value?.filter(
    data => !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleInsert = () => {
  router.push({ name: 'SystemUserInsert' });
};

const handleEdit = (item: IUser) => {
  if (!item) return;
  router.push({ name: 'SystemUserEdit', params: { data: JSON.stringify(item) } });
};

const handleDel = (id: number | undefined) => {
  tableData.value = filterTableData.value?.filter(data => data.id !== id);
  return true;
};

const handleSizeChange = (val: number) => {
  pageNum.value = 1;
  pageSize.value = val;
  getUserList(pageNum.value, pageSize.value);

  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  pageNum.value = val;
  getUserList(pageNum.value, pageSize.value);
  console.log(`current page: ${val}`);
};
</script>
