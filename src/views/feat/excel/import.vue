<!--
 * @Description: Excel 导入
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-05-06 17:18:03
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 17:56:19
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
      <template v-if="tableList.length">
        <el-table
          v-for="(table, index) in tableList"
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
import { AsPageWrapper } from '@/containers/page-wrapper';
import { AsImportExcel, type ExcelData } from '@/components/excel';
import type { ExcelTableData } from './typing';

let tableList = $ref<ExcelTableData[]>([]);
const loadDataSuccess = (excelDataList: ExcelData[]) => {
  tableList = [];
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
    tableList.push({ title: sheetName, dataSource: results, columns });
  }
};
</script>

<style lang="less" scoped></style>
