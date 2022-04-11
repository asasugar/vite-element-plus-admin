export interface IUserInsert {
  role: {
    key: string;
    value: string;
  };
  userName: string;
  email: string;
}

export interface IUser extends IUserInsert {
  id: number;
  createTime: number;
}
