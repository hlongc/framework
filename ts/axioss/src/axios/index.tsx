import Axios from './Axios'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance{
  const context: Axios<any> = new Axios<any>()
  let ins = Axios.prototype.request.bind(context) // 绑定request执行时的this，始终指向axios实例
  ins = Object.assign(ins, Axios.prototype, context) // 合并方法和属性
  return ins as AxiosInstance // 返回re
}

export default createInstance()

export * from './types'