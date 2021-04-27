import { AxiosRequestConfig, AxiosResponse } from './types'
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'
import qs from 'qs'
import parseHeaders from 'parse-headers'

function isObject(val: any): val is boolean {
  return typeof val === 'object' && val !== null
}

interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>
}

// 设置默认配置
const defaults: AxiosRequestConfig = {
  method: 'GET',
  timeout: 0,
  headers: {
    common: {
      accept: 'application/json'
    }
  }
}

// 每种请求方法可以设置自己的配置
const getStyleMethods = ['get', 'head', 'delete', 'options']
const postStyleMethods = ['post', 'put', 'patch']
const allMethods = [...getStyleMethods, ...postStyleMethods]

getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {}
})

postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {}
})


export default class Axios {
  public defaults: AxiosRequestConfig = defaults
  // 拦截器
  public interceptors: Interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(), // 请求拦截器
    response: new AxiosInterceptorManager<AxiosResponse>() // 响应拦截器
  }
  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T> | AxiosRequestConfig> {
    config.headers = Object.assign(this.defaults.headers, config.headers || {}); // 合并配置
    // 转换请求和拦截器功能类似
    if (config.transformRequest && config.data) {
      config.data = config.transformRequest(config.data, config.headers || {})
    }
    const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse>> = [
      { onfulfilled: this.dispatchRequest }
    ]

    // 请求拦截器，先加入的后执行
    this.interceptors.request.intercpters.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
      interceptor && chain.unshift(interceptor)
    })

    this.interceptors.response.intercpters.forEach((interceptor: Interceptor<AxiosResponse> | null) => {
      interceptor && chain.push(interceptor)
    })
    // let promise: Promise<AxiosRequestConfig | Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse>> = Promise.resolve(config)
    let promise: any = Promise.resolve(config)
    while (chain.length > 0) {
      const x = chain.shift()
      if (x) {
        const { onfulfilled, onrejected } = x
        promise = promise.then(onfulfilled, onrejected)
      }
    }
    return promise
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const { method = 'GET', data, params, url = '', timeout, baseURL, responseType = 'json', headers = { 'content-type': 'application/json' }, cancelToken } = config
      // 构造url
      const realUrl = baseURL ? baseURL + url : url
      // 构造查询参数
      let query = ''
      if (isObject(params)) {
        const prefix = realUrl.includes('?') ? '&' : '?'
        query = prefix + qs.stringify(params)
      }
      const requestUrl = realUrl + query
      xhr.open(method, requestUrl, true)
      // 设置responseType
      xhr.responseType = responseType
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status !== 0) {
          if (xhr.status >= 200 && xhr.status < 300) {
            let response: AxiosResponse<T> = {
              data: xhr.response || xhr.responseText,
              request: xhr,
              config,
              headers: parseHeaders(xhr.getAllResponseHeaders()),
              status: xhr.status,
              statusText: xhr.statusText
            }
            // 转换响应结果
            if (config.transformResponse) {
              response = config.transformResponse(response)
            }
            resolve(response)
          } else {
            reject(Error(`${method.toUpperCase()} ${requestUrl} ${xhr.status}`))
          }
        }
      }
      // 处理错误
      xhr.onerror = e => {
        reject(Error(`${method.toUpperCase()} ${requestUrl} net::ERR_INTERNET_DISCONNECTED`))
      }
      // if (isObject(headers)) {
      //   for (const key in headers) {
      //     if (key === 'common' || allMethods.includes(key)) {
      //       for (const k in headers[key]) {
      //         xhr.setRequestHeader(k, headers[key][k])  
      //       }
      //     } else {
      //       xhr.setRequestHeader(key, headers[key])
      //     }
      //   }
      // }

      // 处理超时
      if (timeout) {
        xhr.timeout = timeout
        xhr.ontimeout = () => {
          reject(Error(`timeout of ${timeout}ms exceeded`))
        }
      }
      // 处理取消请求
      if (cancelToken) {
        cancelToken.then((reason: any) => {
          xhr.abort()
          reject(reason)
        })
      }

      const body: string | null = isObject(data) ? JSON.stringify(data) : null
      xhr.send(body)
    })
  }
}