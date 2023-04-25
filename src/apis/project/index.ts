import inject from '../inject';
import type { Page } from '#/global';
import type { ApiGetProjectRes } from './typing';

// 项目列表接口
export const apiGetProjectList = inject<ApiGetProjectRes, Page>('/project/getProjectList', 'get');

// github repository 数据接口
export const apiGetRepositoryList = inject('/project/getRepositoryList', 'get');
