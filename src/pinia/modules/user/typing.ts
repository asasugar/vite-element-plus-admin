export interface UserInfo {
  token: string;
  password?: number | string;
  username?: string;
  avatar?: string;
}

export interface UserState {
  userinfo: Nullable<UserInfo>;
}
