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

export type IUserinfo = {
  token: string;
  password?: number | string;
  username?: string;
  avatar?: string;
};
export type IUserType = {
  [x: string]: IUserinfo;
};
