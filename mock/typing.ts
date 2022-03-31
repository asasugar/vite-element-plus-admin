import type { IUserInfo } from '#/store';

export interface IConfig {
  body: any;
  method: string;
  type: string;
  url: string;
}

export interface IType {
  url: string;
  type?: string;
  response: any;
}


export type IUserType = {
  [x: string]: IUserInfo;
};
