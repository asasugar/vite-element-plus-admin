import type { EpTypeStatus } from '#/ep';
import type { RouteModules } from '#/vue-router';
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

export interface RouteInfo {
  name: string;
  path: string;
  component: string | RouteModules;
  meta: {
    title: string;
    keepAlive?: boolean;
  };
  redirect: string;
  children?: RouteInfo[];
}
export type ApiGetRouteRes = RouteInfo[];

export interface MenuItemInfo {
  sortId: string;
  name: string;
  path: string;
  title: string;
  children?: MenuItemInfo[];
}

export type ApiGetMenuRes = MenuItemInfo[];

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
