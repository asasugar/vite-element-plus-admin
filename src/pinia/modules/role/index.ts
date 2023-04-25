/*
 * @Description: 角色信息
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-08 18:28:25
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 14:27:07
 */

import type { Role, RoleContent } from '@/apis/user/typing';

export default defineStore(
  'roleStore',
  () => {
    // 角色列表编辑时存储数据
    const updateRoleItem = ref<RoleContent>({
      id: 0,
      status: false,
      role: {
        key: '',
        value: ''
      },
      createTime: new Date(),
      remark: ''
    });
    const roleAuth = ref<Role>();

    function setUpdateRoleItem(roleItem: RoleContent) {
      updateRoleItem.value = roleItem;
    }

    function setRoleAuth(role: Role) {
      roleAuth.value = role;
    }
    return { roleAuth, updateRoleItem, setUpdateRoleItem, setRoleAuth };
  },
  {
    persist: true
  }
);
