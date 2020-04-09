import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parseHeaders from 'parse-headers'

export default class Axios{
  // T是用来修饰response中的data的，所以返回值是AxiosResponse<T>类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest<T>(config)
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      const { url, method, params, headers, data, timeout } = config
      const xhr: XMLHttpRequest = new XMLHttpRequest()
      // 处理query参数
      let stringify = ''
      if (params && typeof params === 'object') {
        stringify = qs.stringify(params)
      }
      const reurl = url + (url!.includes('?') ? '&' : '?') + stringify
      // 打开链接
      xhr.open(method!, reurl, true)
      // 设置响应类型为json
      xhr.responseType = 'json' 
      // 状态改变钩子
      xhr.onreadystatechange = function() {
        // 0 1 2 3 4, 4表示完成
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) { // 表示请求成功
            const response: AxiosResponse<T> = {
              data: xhr.response ? xhr.response : xhr.responseText,
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders()), // 将字符串格式转换为对象
              config,
              request: xhr
            }
            resolve(response)
          } else { // 请求失败
            reject(`Error: Request failed with status code ${xhr.status}`)
          }
        }
      }
      // 错误处理
      xhr.onerror = function() {
        reject('net::ERR_INTERNET_DISCONNECTED')
      }

      if (typeof timeout === 'number') {
        xhr.timeout = timeout // 设置超时时间
        xhr.ontimeout = function() {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }
      // 处理headers
      if (typeof headers === 'object') {
        for (const key in headers) {
          xhr.setRequestHeader(key, headers[key])
        }
      }
      let body: string | null = null
      if (data) {
        body = JSON.stringify(data)
      }
      xhr.send(body)
    })
  }
}