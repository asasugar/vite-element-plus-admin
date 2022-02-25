<!--
 * @Description: 用户管理
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-02-25 18:39:47
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
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleValue" label="角色值" />
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
        <template>
          <el-button size="small">Edit</el-button>
          <el-button size="small" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

interface Product {
  roleName: string;
  roleValue: string;
  sortId: number;
  status: boolean;
  createTime: number;
  remark: string;
}
const tableData = ref<Product[]>([
  {
    roleName: '超级管理员',
    roleValue: 'superAdmin',
    sortId: 1,
    status: true,
    createTime: 10,
    remark: '我好着呢'
  },
  {
    roleName: '管理员',
    roleValue: 'admin',
    sortId: 2,
    status: true,
    createTime: 12,
    remark: '我好着呢'
  },
  {
    roleName: '运营人员',
    roleValue: 'operation',
    sortId: 3,
    status: false,
    createTime: 9,
    remark: '我好着呢'
  }
]);
</script>
