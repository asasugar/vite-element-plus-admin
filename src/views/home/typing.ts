// types
export interface IMenuItem {
  sortId: string;
  title: string;
  name: string;
  path: string;
  children?: IMenuItem[];
}

export interface IMenu {
  defaultOpeneds: string[];
  defaultActive: string;
  menu: IMenuItem[];
}
