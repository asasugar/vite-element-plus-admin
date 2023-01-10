export interface RoleItem {
  id?: number;
  role: {
    key: string;
    value: string;
  };
  status: boolean | string;
  remark: string;
  createTime?: number;
}

export interface RoleResult {
  total: number;
  content: RoleItem[];
}
