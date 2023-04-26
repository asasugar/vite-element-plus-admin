<template>
  <div>
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
      @change="handleInputClick"
    />
    <div @click="handleUpload">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as XLSX from 'xlsx';
import { dayUtil } from '@/utils/day-util';
import type { ExcelData } from './typing';

interface Props {
  // 日期时间格式。如果不提供或者提供空值，将返回原始Date对象
  dateFormat: string;
  // 时区调整。实验性功能，仅为了解决读取日期时间值有偏差的问题。目前仅提供了+08:00时区的偏差修正值
  // https://github.com/SheetJS/sheetjs/issues/1470#issuecomment-501108554
  timeZone?: number;
}
interface Emits {
  (e: 'success', excelData: ExcelData[]): void;
  (e: 'error'): void;
}
const props = withDefaults(defineProps<Props>(), {
  timeZone: 8
});

const emit = defineEmits<Emits>();

const inputRef = ref<HTMLInputElement | null>(null);
const loadingRef = ref<boolean>(false);
/**
 * @description: 第一行作为头部
 */
function getHeaderRow(sheet: XLSX.WorkSheet) {
  if (!sheet || !sheet['!ref']) return [];
  const headers: string[] = [];
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = XLSX.utils.decode_range(sheet['!ref']);
  const R = range.s.r;
  /* start in the first row */
  for (let C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}
/**
 * @description: 获得excel数据
 */
function getExcelData(workbook: XLSX.WorkBook) {
  const excelData: ExcelData[] = [];
  const { dateFormat, timeZone } = props;
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const header: string[] = getHeaderRow(worksheet);
    let results = XLSX.utils.sheet_to_json(worksheet, {
      raw: true,
      dateNF: dateFormat //Not worked
    }) as AnyObject[];
    results = results.map((row: AnyObject) => {
      for (let field in row) {
        if (row[field] instanceof Date) {
          if (timeZone === 8) {
            row[field].setSeconds(row[field].getSeconds() + 43);
          }
          if (dateFormat) {
            row[field] = dayUtil(row[field]).format(dateFormat);
          }
        }
      }
      return row;
    });
    excelData.push({
      header,
      results,
      meta: {
        sheetName
      }
    });
  }
  return excelData;
}
/**
 * @description: 读取excel数据
 */
function readerData(rawFile: File) {
  loadingRef.value = true;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const data = e.target && e.target.result;
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        // console.log(workbook);
        /* DO SOMETHING WITH workbook HERE */
        const excelData = getExcelData(workbook);
        emit('success', excelData);
        resolve('');
      } catch (error) {
        reject(error);
        emit('error');
      } finally {
        loadingRef.value = false;
      }
    };
    reader.readAsArrayBuffer(rawFile);
  });
}
async function upload(rawFile: File) {
  const inputRefDom = unref(inputRef);
  if (inputRefDom) {
    // fix can't select the same excel
    inputRefDom.value = '';
  }
  await readerData(rawFile);
}
/**
 * @description: 触发选择文件管理器
 */
function handleInputClick(e: Event) {
  const files = (e?.target as unknown as { files: File[] })?.files;
  const rawFile = files?.[0]; // only setting files[0]
  if (!rawFile) return;
  upload(rawFile);
}
/**
 * @description: 点击上传按钮
 */
function handleUpload(): MouseEvent | undefined {
  const inputRefDom = unref(inputRef);
  inputRefDom?.click();
  return;
}
</script>
