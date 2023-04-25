import type { ApiGetMenuRes } from '@/apis/system/typing';

// types
export interface HomeTabInfo {
  defaultOpeneds: string[];
  defaultActive: string;
  breadcrumb: string[];
  title: string;
  path: string;
}

export interface HomeMenuInfo {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: Nullable<ApiGetMenuRes>;
}
