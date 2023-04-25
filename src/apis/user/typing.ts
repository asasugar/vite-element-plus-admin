export interface ApiLoginData {
  username: string;
  password: string;
}

export interface ApiGetBaseUserInfoData {
  token: string;
}

export interface ApiGetBaseUserInfoRes {
  token: string;
  username: string;
  avatar: string;
}

export interface ApiLogoutRes {
  msg: string;
}

export interface Role {
  key: string;
  value: string;
}

export interface UserContent {
  id: number;
  createTime: Date;
  userName: string;
  email: string;
  role: Role;
}

export interface ApiGetUserListRes {
  pageNum: number;
  pageSize: number;
  content: UserContent[];
  total: number;
}

export interface RoleContent {
  id: number;
  status: boolean;
  role: Role;
  createTime: Date;
  remark: string;
}

export interface ApiGetRoleListRes {
  pageNum: number;
  pageSize: number;
  content: RoleContent[];
  total: number;
}
