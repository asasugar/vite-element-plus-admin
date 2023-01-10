// types
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

export type NavResult = Array<{
  name: string;
  title: string;
}>;

export type NewsResult = Array<{
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}>;
