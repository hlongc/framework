
interface OnFullfilled<V> {
  (value: V): V | Promise<V>;
}

interface OnRejected {
  (error: any): any;
}


export interface Interceptor<V> {
  onfulfilled?: OnFullfilled<V>;
  onrejected?: OnRejected;
}

export default class AxiosInterceptorManager<T> {
  public intercpters:Array<Interceptor<T> | null> = []

  use(onfulfilled?: OnFullfilled<T>, onrejected?: OnRejected): number {
    this.intercpters.push({ onfulfilled, onrejected })
    return this.intercpters.length - 1
  }

  eject(id: number): void {
    if (this.intercpters[id]) {
      this.intercpters[id] = null
    }
  }
}