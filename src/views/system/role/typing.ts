import type { ElForm } from 'element-plus';
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

export type FormInstance = InstanceType<typeof ElForm>;
