
export function is(val: any, type: string) {
    return toString.call(val) === `[object ${type}]`;
}
export const isFunction = (val: any): val is (typeof Function) => typeof val === 'function';

export function isString(val: any): val is string {
    return is(val, 'String');
}

export const isObject = (item): boolean => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export const isArr = (origin: any): boolean => {
    let str = '[object Array]'
    return Object.prototype.toString.call(origin) == str ? true : false
}

export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    let url = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}

export function deepMerge<T = any>(src: any, target: any): T {
    let key: string;
    for (key in target) {
        src[key] =
            src[key] && src[key].toString() === '[object Object]'
                ? deepMerge(src[key], target[key])
                : (src[key] = target[key]);
    }
    return src;
}