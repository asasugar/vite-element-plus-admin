export interface User {
  id: number;
  createTime: number;
  role: {
    key: string;
    value: string;
  };
  userName: string;
  email: string;
}

export type UserInsert = Omit<User, 'id' | 'createTime'>;
