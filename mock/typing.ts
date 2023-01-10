import type { UserInfo } from '@/pinia/modules/user/typing';

export interface MockConfig {
  body: any;
  method: string;
  type: string;
  url: string;
}

export interface MockType {
  url: string;
  type?: string;
  response: any;
}

export type IUserType = {
  [x: string]: UserInfo;
};
