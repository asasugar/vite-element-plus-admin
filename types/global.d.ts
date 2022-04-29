declare module '*.json' {
  const value: any;
  export default value;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
}
