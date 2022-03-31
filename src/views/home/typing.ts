// types
export interface IMenuItem {
  sortId: string;
  title: string;
  name: string;
  path: string;
  children?: IMenuItem[];
}
