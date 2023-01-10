declare module '*.json' {
  const value: any;
  export default value;
}

export interface Page {
  pageNum: number;
  pageSize: number;
}

export type TargetContext = '_self' | '_blank';
