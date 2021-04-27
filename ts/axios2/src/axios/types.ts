import type AxiosInterceptorManager from './AxiosInterceptorManager'
import CancelToken from './cancel/CancelToken'

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'

export interface AxiosRequestConfig {
  baseURL?: string;
  url?: string;
  method?: Method;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  responseType?: ResponseType;
  timeout?: number;
  transformRequest?: (data: any, headers: Record<string, any>) => any;
  transformResponse?: (data: any) => any;
  cancelToken?: Promise<any>;
}

export interface AxiosResponse<T = any> {
  data: T;
  config: AxiosRequestConfig;
  status: number;
  statusText: string;
  request: XMLHttpRequest;
  headers: Record<string, any>;
}

export interface AxiosInstance {
  <T = any>(config:AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  CancelToken: CancelToken;
  isCancel: (val: any) => boolean;
}

