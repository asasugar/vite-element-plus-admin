import type { ElForm } from 'element-plus';
export interface IProduct {
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
