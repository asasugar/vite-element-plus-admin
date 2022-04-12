// types
export interface ICommon {
  title: string;
  path: string;
}

export interface ITab extends ICommon {
  defaultOpeneds: string[];
  defaultActive: string;
  breadcrumb: string[];
}

export interface IMenuItem extends ICommon {
  sortId: string;
  name: string;
  children?: IMenuItem[];
}

export interface IMenu {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: IMenuItem[];
}
