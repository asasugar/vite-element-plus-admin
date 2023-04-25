/*
 * @Description: 用户信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-08 18:28:25
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 14:21:01
 */

import type { UserContent } from '@/apis/user/typing';
import type { UserInsert } from '@/views/system/user/typing';
import type { UserInfo } from './typing';

export default defineStore(
  'userStore',
  () => {
    // 用户列表编辑时，存储的数据
    const updateUserItem = ref<UserInsert>({
      userName: '',
      role: {
        key: '',
        value: ''
      },
      email: ''
    });
    // 用户登录之后的个人信息
    const userinfo = ref<Nullable<UserInfo>>(null);

    function setUpdateUserItem(userItem: UserContent) {
      updateUserItem.value = userItem;
    }

    function updateUserinfo(info: UserInfo) {
      userinfo.value = info;
    }

    return { updateUserItem, userinfo, setUpdateUserItem, updateUserinfo };
  },
  {
    persist: true
  }
);
