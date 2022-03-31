import inject from '../inject';

// 项目列表接口
export const apiGetProjectList = inject('/project/getProjectList', 'get');

// github repository 数据接口
export const apiGetRepositoryList = inject('/project/getRepositoryList', 'get');
