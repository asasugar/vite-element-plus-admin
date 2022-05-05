export interface IRole {
  id?: number;
  role: {
    key: string;
    value: string;
  };
  status: boolean | string;
  remark: string;
  createTime?: number;
}
