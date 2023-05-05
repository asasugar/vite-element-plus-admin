import { ElMessage } from 'element-plus';
import Json2excel from '@asasugar-use/custom-json2excel';
import type { Ref } from 'vue';
import type { EpSizeType } from '#/ep';

export function useTable<T extends AnyObject>({
  tableData,
  totalNum,
  getTableData,
  searchFilterConditions
}: {
  tableData: Ref<T[]>;
  totalNum: Ref<number>;
  getTableData: any;
  searchFilterConditions?: any;
}) {
  const size = ref<EpSizeType>('default');
  const search = ref<string>('');
  const pageNum = ref<number>(1);
  const pageSize = ref<number>(10);
  const multipleSelection = ref([]) as Ref<T[]>;
  const filterTableData = computed(() => tableData.value?.filter(searchFilterConditions) ?? []);

  watch(
    [pageNum, pageSize],
    () => {
      console.log('watch 监听到表格 pageNum or pageSize 改变');
      getTableData(pageNum.value, pageSize.value);
    },
    {
      immediate: true
    }
  );
  /**
   * 更新表格尺寸
   * @param {EpSizeType} command
   */
  const handleCommand = (command: EpSizeType) => {
    if (size.value === command || !command) return;
    size.value = command;
  };

  /**
   * 更新页数
   * @param {number} val
   * @return {*}
   */
  const handleSizeChange = (val: number) => {
    pageNum.value = 1;
    pageSize.value = val;
    console.log(`${val} items per page`);
  };

  /**
   * 更新当前页码
   * @param {number} val
   */
  const handleCurrentChange = (val: number) => {
    pageNum.value = val;
    console.log(`current page: ${val}`);
  };

  /**
   * 返回勾选中的表格数据
   * @param {T[]} val
   */
  const handleSelectionChange = (val: T[]) => {
    multipleSelection.value = val;
  };

  /**
   * 重置表格参数
   */
  const handleReset = () => {
    tableData.value.length = 0;
    totalNum.value = 0;
    search.value = '';
    pageNum.value = 1;
    pageSize.value = 10;
    multipleSelection.value.length = 0;
  };

  /**
   * 刷新表格
   */
  const handleRefresh = () => {
    handleReset();
    getTableData(pageNum.value, pageSize.value);
  };

  /**
   * 选中的数据导出excel
   */
  const handleExportExcel = ({
    excelData = multipleSelection.value,
    keyMap,
    orderedKey,
    scope
  }: {
    excelData?: AnyObject[];
    keyMap?: AnyObject;
    orderedKey?: string[];
    scope?: AnyObject;
  }) => {
    if (excelData?.length) {
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

  const handleDel = (id?: number) => {
    tableData.value = filterTableData.value?.filter(data => data.id !== id);
    return true;
  };
  return {
    size,
    search,
    filterTableData,
    pageSize,
    pageNum,
    multipleSelection,
    handleCommand,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleReset,
    handleRefresh,
    handleExportExcel,
    handleDel
  };
}
