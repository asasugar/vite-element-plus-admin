import AxiosInstance from '@/utils/request';
import responseHandle from '@/utils/request/responseHandle';
import type {
  AxiosResCode,
  AxiosResult,
  Method,
  RequestExtendsOptions,
  CustomAxiosRequestConfig,
  CustomAxiosResponse
} from '#/axios';

export default function inject<R, D extends AnyObject = object, O = RequestExtendsOptions>(
  url: string,
  method: Method = 'post'
) {
  return async (data?: D, options?: O): Promise<AxiosResult<Nullable<R>>> => {
    const response: CustomAxiosResponse = await AxiosInstance[method](url, {
      data,
      ...options
    } as Partial<CustomAxiosRequestConfig>);

    const code: AxiosResCode = response.data.code;

    return ((code && responseHandle[code]) || responseHandle['default'])(response);
  };
}
