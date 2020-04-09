export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: Object;
  transformResponse?: Object;
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  cancelToken?: Function;
}


export interface AxiosResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
  config?: AxiosRequestConfig;
  headers?: Record<string, any>;
  request: XMLHttpRequest;
}

// 修饰Axios.prototype.request方法
// Promise的泛型T是修饰Promise变成成功态以后resolve(value)中的value value:T 
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
}