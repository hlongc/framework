
export interface Interceptor<T>{
  onFulfilled?: OnFulfilled<T>
  onRejected?: OnRejected
}

interface OnFulfilled<T> {
  (value: T): T | Promise<T>
}

interface OnRejected {
  (error: any): any
}

// T可能是AxiosRequestConfig也可能是AxiosResponse
export default class AxiosInterceptorManager<T> {
  // 保存当前的拦截器
  public interceptorQueue: Array<Interceptor<T> | null> = []
  // use方法存拦截器
  use(onFulfilled?: OnFulfilled<T> , onRejected?: OnRejected): number {
    this.interceptorQueue.push({
      onFulfilled,
      onRejected
    })
    return this.interceptorQueue.length - 1
  }
  // 根据索引删除拦截器
  eject(index: number) {
    if (index) {
      this.interceptorQueue[index] = null
    }
  }
}