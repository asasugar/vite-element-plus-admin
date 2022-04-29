declare module '*.json' {
  const value: any;
  export default value;
}

export type Nullable<T> = T | null;

export type FormInstance = InstanceType<typeof ElForm>;

export type TableInstance = InstanceType<typeof ElTable>;

declare type TargetContext = '_self' | '_blank';

export interface IPage {
  pageNum: number;
  pageSize: number;
}
