<!--
 * @Description: Excel 导出
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-05-06 17:18:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-05-05 16:52:03
-->
<template>
  <AsPageWrapper header-title="Excel 导出演示">
    <template #extra>
      <div class="flex center">
        <el-button type="primary" @click="handleExportExcel">导出Excel</el-button>
      </div>
    </template>
    <template #bodyContent>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" width="55" />
        <el-table-column prop="userName" label="用户名" width="180" />
        <el-table-column prop="email" sortable label="邮箱" />
        <el-table-column prop="createTime" sortable label="创建时间" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <span class="pl10">{{ scope.row.role.value }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import Json2excel from '@asasugar-use/custom-json2excel';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useData } from '@/views/system/user/hooks/use-data';

const { loading, tableData, getUserList } = useData();

getUserList(1, 10);

const handleExportExcel = () => {
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

  const json2excel = new Json2excel({
    data: tableData.value,
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
};
</script>

<style lang="less" scoped></style>
