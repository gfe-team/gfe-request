import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosTransform } from './axios.transform';
import { checkStatus } from './check.status';
import { errorResult } from './const';
import { RequestEnum, ResultEnum } from './httpEnum';
import { CreateAxiosOptions, RequestOptions, Result } from './types';
import { isFunction, isString, setObjToUrlParams } from './utils';

export const transform: AxiosTransform = {
    // 处理请求数据
    transformRequestData: (res: AxiosResponse<Result>, axiosOptions: Partial<CreateAxiosOptions>) => {

        const options: RequestOptions = axiosOptions.requestOptions;

        const { isTransformRequestResult, customTransformResult } = options;
        
        // if(res._CALCEL_) return;
        if(!res) return;
        // @ts-ignore
        if (res?.message && (res.message.startsWith('post&http') || res.message.startsWith('get&http'))) return;

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) return res.data;

        // 错误的时候返回
        if (!res || !res.data) {
            // return '[HTTP] Request has no return value';
            // console.log('[HTTP] Request has no return value')
            // return Promise.reject(errorResult);
            return errorResult;
        }

        // 解析接口返回值
        const resData = res.data as any || {};
        const result = (customTransformResult && isFunction(customTransformResult)) ? customTransformResult(resData) : resData;

        const actionResult = result.actionResult || result.ActionResult;
        const respData = result.data || result.Data;
        const message = result.message || result.Message;

        // // 这里逻辑可以根据项目进行修改
        // const isResultSuccess: boolean = actionResult?.toString() === '1';
        // const hasSuccess = result?.data !== null && isResultSuccess;
        const isResultSuccess: boolean = actionResult?.toString() === ResultEnum.SUCCESS && result?.data !== null;
        if (!isResultSuccess) {
            if (message) {
                // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                if (options.errorMessageMode === 'modal') {
                    // createErrorModal({ title: '错误提示', content: message });
                    // Modal.error({
                    //     title: () => '错误提示',
                    //     content: () => message,
                    // });
                    axiosOptions?.modalError(message);
                } else {
                    // createMessage.error(message);
                    // _Message.error(message);
                    axiosOptions?.messageError(message);

                    return Promise.reject(message);
                }
            }
            // return Promise.reject(errorResult);
            Promise.reject(new Error(message));
            return errorResult;
        }

        // 接口请求成功，直接返回结果
        if (isResultSuccess) {
            return {

                ...respData
            };
        }

        // 接口请求错误，统一提示错误信息
        if (!isResultSuccess) {
            if (message) {
                // createMessage.error(data.message);
                // _Message.error(message);
                axiosOptions?.messageError(message);
                Promise.reject(message);
            } else {
                const msg = '操作失败,系统异常!';
                // createMessage.error(msg);
                // _Message.error(msg);
                axiosOptions?.messageError(msg);
                Promise.reject(msg);
            }

            return errorResult;
        }
        // // 登录超时
        // if (code === ResultEnum.TIMEOUT) {
        //     const timeoutMsg = '登录超时,请重新登录!';
        //     _Message.error(timeoutMsg);
        //     Promise.reject(new Error(timeoutMsg));
        //     return errorResult;
        // }

        return errorResult;
    },

    // 请求之前处理config
    beforeRequestHook: (config: AxiosRequestConfig, axiosOptions: Partial<CreateAxiosOptions>) => {

        const options: RequestOptions = axiosOptions?.requestOptions;
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate } = options;

        if (joinPrefix) {
            config.url = `${axiosOptions?.prefixUrl || ''}${config.url}`;
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }
        const method = config.method || RequestEnum.GET;
        if (method.toUpperCase() === RequestEnum.GET) {
            const now = new Date().getTime();
            if (!isString(config.params)) {
                config.data = {
                    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                    params: Object.assign(config.params || {}, {
                        _t: now,
                    }),
                };
            } else {
                // 兼容restful风格
                config.url = config.url + config.params + `?_t=${now}`;
                config.params = undefined;
            }
        } else {
            if (!isString(config.params)) {
                // formatDate && formatRequestDate(config.params);
                // 常规HTTP请求
                if (!config.data) {
                    config.data = config.params;
                    config.params = undefined;
                } else {
                    // 文件上传HTTP
                    const confData = config.data;
                    config.data = confData;
                    config.params = confData;
                }

                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url as string, config.data);
                }
            } else {
                // 兼容restful风格
                config.url = config.url + config.params;
                config.params = undefined;
            }
        }
        return config;
    },

    // 请求拦截器处理
    requestInterceptors: (config: AxiosRequestConfig) => {
        // // 请求之前处理config
        // const userStore = useUserStore();
        // const token = userStore.token;

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        // console.log(config);
        return config;
    },

    // 响应错误处理
    responseInterceptorsCatch: (error: any, options?: CreateAxiosOptions) => {
        // errorStore.setupErrorHandle(error);
        const { response, code, message } = error || {};
        const msg: string = response && response.data && response.data.error ? response.data.error.message : '';
        const err: string = error.toString();
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                message.error('接口请求超时,请刷新页面重试!');
                return;
            }
            if (err && err.includes('Network Error')) {
                // createErrorModal({
                //   title: '网络异常',
                //   content: '请检查您的网络连接是否正常!',
                // });
                // Modal.error({
                //     title: () => '网络异常',
                //     content: () => '请检查您的网络连接是否正常!',
                // });
                return;
            }
        } catch (error) {
            // throw new Error(error);
        }

        checkStatus(error.response && error.response.status, msg, options?.messageError);
        return error;
    },
};

