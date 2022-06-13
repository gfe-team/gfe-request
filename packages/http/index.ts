import { AxiosRequestConfig } from 'axios';
import { GAxios } from './axios';
import { ContentTypeEnum, RequestEnum } from './httpEnum';
import { transform } from './transform';
import { CreateAxiosOptions, RequestOptions } from './types';
import { deepMerge } from './utils';

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {

    const mergedOptions = deepMerge(
        {
            timeout: 6 * 10 * 1000,// 1min
            // 基础接口地址
            baseURL: '',
            // 接口可能会有通用的地址部分，可以统一抽取出来
            prefixUrl: '',
            headers: { 'Content-Type': ContentTypeEnum.JSON },
            // 数据处理方式
            transform,
            // 配置项，下面的选项都可以在独立的接口请求中覆盖
            requestOptions: {
                // 默认将prefix 添加到url
                joinPrefix: true,
                // 需要对返回数据进行处理
                isTransformRequestResult: true,
                // post请求的时候添加参数到url
                joinParamsToUrl: false,
                // 格式化提交参数时间
                formatDate: true,
                // 消息提示类型
                errorMessageMode: 'none',
                // 接口地址
                apiUrl: '',
                customTransformResult: data => data,
                messageBox: data => data
            },
        },
        opt || {}
    );

    return new GAxios(mergedOptions);
}

// 抽象常用GAxios请求方法,提供对外统一API
class AxiosHttp {

    private http: GAxios = null;

    constructor(config: Partial<CreateAxiosOptions>) {
        // console.log(config)
        this.init(config);
    }

    public getInstance(): GAxios {

        return this.http;
    }

    private init(config: Partial<CreateAxiosOptions>) {

        this.http = createAxios(config);
    }

    public get<T>(url: string, params: any = {}, options: RequestOptions = {}): Promise<T> {
        return this.http.request<T>({
            url,
            params,
            method: RequestEnum.GET
        }, options)
    }

    public post<T>(url: string, params: any = {}, options: RequestOptions = {}): Promise<T> {
        return this.http.request<T>({
            url,
            params,
            method: RequestEnum.POST
        }, options)
    }

    public put<T>(url: string, params: any = {}, options: RequestOptions = {}): Promise<T> {
        return this.http.request<T>({
            url,
            params,
            method: RequestEnum.PUT
        }, options)
    }

    public delete<T>(url: string, params: any = {}, options: RequestOptions = {}): Promise<T> {
        return this.http.request<T>({
            url,
            params,
            method: RequestEnum.DELETE
        }, options)
    }

    public request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {

        return this.http.request<T>(config, options);
    }

    public getHeader(): { Authorization: string } {
        const header = this.http.getHeader();
        const Authorization = header['Authorization'];

        return { Authorization }
    }

    public setToken(token: string): void {
        this.http.setHeader({
            Authorization: `Bearer ${token}`
        });
    }
}

export default AxiosHttp;