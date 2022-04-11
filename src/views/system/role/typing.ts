export interface IRole {
  role: {
    key: string;
    value: string;
  };
  status: boolean;
  remark: string;
  createTime?: number;
  sortId?: number;
}
