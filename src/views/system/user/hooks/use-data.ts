import { userService } from '@/services';
import { useLoading } from '@/hooks/use-loading';
import type { ApiGetUserListRes } from '@/apis/user/typing';

export function useData() {
  const { loading, showLoading, hideLoading } = useLoading();
  const tableData = ref<ApiGetUserListRes['content']>([]);
  const totalNum = ref<number>(0);

  const getUserList = async (pageNum: number, pageSize: number) => {
    showLoading();
    const content = await userService.getUserList({
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
    getUserList
  };
}
