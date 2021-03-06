import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axios.transform';

export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
  // 自定义处理请求结果
  customTransformResult?: Function | null;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  messageError?: Function | null;
  modalError?: Function | null;
}

export interface Result<T = any> {
  actionResult: number | string;
  message: string;
  data: T;
}
