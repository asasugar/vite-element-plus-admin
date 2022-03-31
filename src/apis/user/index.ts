import inject from '../inject';

// 登录接口
export const apiLogin = inject('/user/login');

// 注销接口
export const apiLogout = inject('/user/logout');

// 获取用户信息接口
export const apiGetBaseUserInfo = inject('/user/getBaseUserInfo', 'get');
