import inject from '../inject';
import type { Page } from '#/global';
import type {
  ApiLoginData,
  ApiGetBaseUserInfoData,
  ApiGetBaseUserInfoRes,
  ApiLogoutRes,
  ApiGetRoleListRes,
  ApiGetUserListRes
} from './typing';
// 登录接口
export const apiLogin = inject<ApiGetBaseUserInfoRes, ApiLoginData>('/user/login');

// 注销接口
export const apiLogout = inject<ApiLogoutRes>('/user/logout');

// 获取用户信息接口
export const apiGetBaseUserInfo = inject<ApiGetBaseUserInfoRes, ApiGetBaseUserInfoData>(
  '/user/getBaseUserInfo',
  'get'
);

// 获取角色列表接口
export const apiGetRoleList = inject<ApiGetRoleListRes, Page>('/user/getRoleList', 'get');

// 获取用户列表接口
export const apiGetUserList = inject<ApiGetUserListRes, Page>('/user/getUserList', 'get');
