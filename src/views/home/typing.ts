// types
export interface HomeCommonInfo {
  title: string;
  path: string;
}

export interface HomeTabInfo extends HomeCommonInfo {
  defaultOpeneds: string[];
  defaultActive: string;
  breadcrumb: string[];
}

export interface HomeMenuItem extends HomeCommonInfo {
  sortId: string;
  name: string;
  children?: HomeMenuItem[];
}

export interface HomeMenuInfo {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: HomeMenuItem[];
}
