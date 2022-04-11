import inject from '../inject';

// 登录接口
export const apiLogin = inject('/user/login');

// 注销接口
export const apiLogout = inject('/user/logout');

// 获取用户信息接口
export const apiGetBaseUserInfo = inject('/user/getBaseUserInfo', 'get');

// 获取角色列表接口
export const apiGetRoleList = inject('/user/getRoleList', 'get');

// 获取用户列表接口
export const apiGetUserList = inject('/user/getUserList', 'get');
