export type TFileType = 'fileStream' | 'fileUrl' | 'base64Stream' | 'imgUrl';

export interface IDownload {
  message: string;
  buttonValue: string;
  type: TFileType;
}
