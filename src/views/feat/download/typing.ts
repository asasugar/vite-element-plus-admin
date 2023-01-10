export type FileType = 'fileStream' | 'fileUrl' | 'base64Stream' | 'imgUrl';

export interface DownloadInfo {
  message: string;
  buttonValue: string;
  type: FileType;
}
