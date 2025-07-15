export interface IHttpModule<T = Record<string, unknown>> {
    module: string;
    data?: T;
    mainUrl?: string;
    token?: string;
    noCache?: boolean;
}

export interface IHttpHeaderModule {
    isPublic?: boolean;
    token?: string;
    noCache?: boolean;
}
