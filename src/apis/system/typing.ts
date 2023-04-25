import type { EpTypeStatus } from '#/ep';

export interface AnalysisInfo {
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
  tagType: EpTypeStatus;
}

export interface ApiGetAnalysisDataRes {
  visit: AnalysisInfo;
  total: AnalysisInfo;
  download: AnalysisInfo;
}

export type ApiGetRouteRes = {
  name: string;
  path: string;
  component: string;
  meta: {
    title: string;
    keepAlive?: boolean;
  };
  redirect: string;
  children?: ApiGetRouteRes;
}[];

export type ApiGetMenuRes = {
  sortId: string;
  name: string;
  path: string;
  title: string;
  children?: ApiGetMenuRes;
}[];

export interface ProjectResult {
  list: {
    sortId: string;
    sortName: string;
    icon: string;
    name: string;
    desc: string;
    editTime: string;
  }[];
  pageNum: number;
  pageSize: number;
  total: number;
}

export type ApiGetQuickNavRes = Array<{
  name: string;
  title: string;
}>;

export type ApiGetLatestNewsRes = Array<{
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}>;

export interface ProjectResult {
  list: {
    sortId: string;
    sortName: string;
    icon: string;
    name: string;
    desc: string;
    editTime: string;
  }[];
  pageNum: number;
  pageSize: number;
  total: number;
}
