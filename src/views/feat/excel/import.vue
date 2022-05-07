<!--
 * @Description: Excel 导入
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-05-06 17:18:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-05-07 11:28:30
-->
<template>
  <AsPageWrapper header-title="Excel 导入演示">
    <template #extra>
      <div class="flex center">
        <AsImportExcel date-format="YYYY-MM-DD" @success="loadDataSuccess">
          <el-button type="primary">导入Excel</el-button>
        </AsImportExcel>
      </div>
    </template>
    <template #bodyContent>
      <template v-if="tableListRef.length">
        <el-table
          v-for="(table, index) in tableListRef"
          :key="index"
          border
          highlight-current-row
          style="width: 100%"
          :data="table.dataSource"
        >
          <el-table-column
            v-for="column in table.columns"
            :key="column.dataIndex"
            :prop="column.dataIndex"
            :label="column.title"
            resizable
          />
        </el-table>
      </template>
      <el-empty v-else description="No Data" />
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { AsImportExcel, IExcelData } from '@/components/excel';
import type { IExcelTableData } from './typing';
const tableListRef = ref<IExcelTableData[]>([]);

const loadDataSuccess = (excelDataList: IExcelData[]) => {
  tableListRef.value = [];
  for (const excelData of excelDataList) {
    const {
      header,
      results,
      meta: { sheetName }
    } = excelData;
    const columns = [];
    for (const title of header) {
      columns.push({ title, dataIndex: title });
    }
    tableListRef.value.push({ title: sheetName, dataSource: results, columns });
  }
};
</script>

<style lang="less" scoped></style>
