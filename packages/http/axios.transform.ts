import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CreateAxiosOptions, Result } from "./types";

export abstract class AxiosTransform {

  // 请求之前处理配置
  beforeRequestHook?: (config: AxiosRequestConfig, axiosOptions: Partial<CreateAxiosOptions>) => AxiosRequestConfig;

  // 请求成功处理
  transformRequestData?: (res: AxiosResponse<Result>, axiosOptions: Partial<CreateAxiosOptions>) => any;

  // 请求失败处理
  requestCatch?: (e: Error) => Promise<any>;

  // 请求之前的拦截器
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  // 请求之后的拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  // 请求之前的拦截器错误处理
  requestInterceptorsCatch?: (error: Error, options?: CreateAxiosOptions) => void;

  // 请求之后的拦截器错误处理
  responseInterceptorsCatch?: (error: Error, options?: CreateAxiosOptions) => void;
}
