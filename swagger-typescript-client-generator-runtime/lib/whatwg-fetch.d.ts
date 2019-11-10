import { RequestFactoryType } from './index';
export declare type WhatWgFetchFunctionType = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export interface WhatWgFetchRequestFactoryOptions {
    requestInit: Omit<RequestInit, 'body' | 'method'>;
    fetch?: WhatWgFetchFunctionType;
}
export declare const WhatWgFetchRequestFactory: (baseUrl: string, options: WhatWgFetchRequestFactoryOptions) => RequestFactoryType;
