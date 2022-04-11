declare module '*.json' {
  const value: any;
  export default value;
}

export type Nullable<T> = T | null;

export interface IPage {
  pageNum: number;
  pageSize: number;
}

export type FormInstance = InstanceType<typeof ElForm>;
