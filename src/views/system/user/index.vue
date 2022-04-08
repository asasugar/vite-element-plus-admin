<!--
 * @Description: 用户管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-08 23:02:01
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '12px 12px 2px 12px' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>用户管理</span>
        <el-link href="https://github.com/asasugar?tab=repositories" :underline="false">
          <el-button class="button" type="text">更多</el-button>
        </el-link>
      </div>
    </template>
    <el-table :data="tableData" border highlight-current-row style="width: 100%">
      <el-table-column prop="sortId" label="序号" />
      <el-table-column prop="userName" label="用户名" width="180" />
      <el-table-column prop="email" sortable label="邮箱" />
      <el-table-column prop="createTime" sortable label="创建时间" />
      <el-table-column prop="roleName" label="角色" />
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
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();

interface IUser {
  sortId: number;
  userName: string;
  email: string;
  createTime: number;
  roleName: string;
}
const tableData = ref<IUser[]>([
  {
    sortId: 1,
    userName: 'superAdmin',
    email: '1',
    createTime: 10,
    roleName: '我好着呢'
  },
  {
    sortId: 2,
    userName: 'superAdmin',
    email: '1',
    createTime: 10,
    roleName: '我好着呢'
  },
  {
    sortId: 3,
    userName: 'superAdmin',
    email: '1',
    createTime: 10,
    roleName: '我好着呢'
  }
]);

const handleEdit = (item: IUser) => {
  if (!item) return;
  // router.push({ name: 'SystemRoleEdit', params: { data: JSON.stringify(item) } });
};

const handleDel = (sortId: number | undefined) => {
  tableData.value = tableData.value?.filter(data => data.sortId !== sortId);
  return true;
};
</script>
