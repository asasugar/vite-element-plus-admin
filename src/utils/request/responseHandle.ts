import { ElMessage } from 'element-plus';
import type { AxiosResponseHandle } from '#/axios';
// 返回结果处理
// 自定义约定接口返回{code: xxx, result: xxx, message:'err message'},根据api模拟，具体可根据业务调整
const responseHandle: AxiosResponseHandle = {
  200: response => {
    return Promise.resolve(response.data);
  },
  201: response => {
    ElMessage({ message: `参数异常:${response.data.message}`, type: 'warning' });
    return Promise.resolve(response.data);
  },
  404: response => {
    ElMessage({ message: '接口地址不存在', type: 'error' });
    return Promise.reject(response.data);
  },
  default: response => {
    ElMessage({ message: response.data.message || '操作失败', type: 'error' });
    return Promise.reject(response.data);
  }
};
export default responseHandle;
