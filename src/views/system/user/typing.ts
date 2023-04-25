import type { UserContent } from '@/apis/user/typing';

export type UserInsert = Omit<UserContent, 'id' | 'createTime'>;
