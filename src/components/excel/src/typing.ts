export interface IExcelData<T = any> {
  header: string[];
  results: T[];
  meta: { sheetName: string };
}
