// types
interface IProjectItem {
  sortId: string;
  sortName: string;
  icon: string;
  name: string;
  desc: string;
  editTime: string;
}
interface INavItem {
  name: string;
  title: string;
}
interface INewsItem {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
export type { IProjectItem, INavItem, INewsItem };
