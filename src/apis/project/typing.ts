export interface ApiGetProjectRes {
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
