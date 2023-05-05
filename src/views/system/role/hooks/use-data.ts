import { userService } from '@/services';
import { useLoading } from '@/hooks/use-loading';
import type { ApiGetRoleListRes } from '@/apis/user/typing';

export function useData() {
  const { loading, showLoading, hideLoading } = useLoading();
  const tableData = ref<ApiGetRoleListRes['content']>([]);
  const totalNum = ref<number>(0);

  const getRoleList = async (pageNum: number, pageSize: number) => {
    showLoading();
    const content = await userService.getRoleList({
      pageNum,
      pageSize
    });
    hideLoading();
    if (content) {
      const { total, content: tableContent } = content;
      totalNum.value = total;
      tableData.value = tableContent;
    }
  };
  return {
    loading,
    tableData,
    totalNum,
    getRoleList
  };
}
