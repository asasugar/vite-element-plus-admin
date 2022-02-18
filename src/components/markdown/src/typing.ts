import Vditor from 'vditor';
export interface MarkDownActionType {
  md2html: (mdText: string, options?: IPreviewOptions | undefined) => Promise<string>;
  getVditor: () => Vditor;
}

export type Nullable<T> = T | null;
