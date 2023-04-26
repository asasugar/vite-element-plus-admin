import { projectService, systemService } from '@/services';
import type { ApiGetProjectRes } from '@/apis/project/typing';
import type { ApiGetQuickNavRes, ApiGetLatestNewsRes } from '@/apis/system/typing';

export function useData() {
  const projectList = ref<ApiGetProjectRes['list']>([]);
  const navList = ref<ApiGetQuickNavRes>([]);
  const newsList = ref<ApiGetLatestNewsRes>([]);

  const getProjectList = async () => {
    const content = await projectService.getProjectList({
      pageNum: 1,
      pageSize: 9
    });
    projectList.value = content?.list ?? [];
  };
  const getQuickNavList = async () => {
    navList.value = (await systemService.getQuickNavList()) ?? [];
  };
  const getLatestNews = async () => {
    newsList.value = (await systemService.getLatestNews()) ?? [];
  };
  return {
    projectList,
    navList,
    newsList,
    getProjectList,
    getQuickNavList,
    getLatestNews
  };
}
