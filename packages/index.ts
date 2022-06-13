import { App, inject } from 'vue';
import AxiosHttp from './http';
import { CreateAxiosOptions } from './http/types';

const uniqueKey = Symbol();

const install = (app: App, config: Partial<CreateAxiosOptions>): void => {

    app.provide(uniqueKey, new AxiosHttp(config));
}

export const useAxiosHttp = (): AxiosHttp => {

    return inject(uniqueKey) as AxiosHttp;
}

export default {
    install
}

