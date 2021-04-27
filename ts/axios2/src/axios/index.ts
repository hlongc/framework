import Axios from './axios'
import { AxiosInstance } from './types'
import { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'

function createInstance() {
  const context: Axios = new Axios()
  const instance = Axios.prototype.request.bind(context)
  Object.assign(instance, Axios.prototype, context)
  return instance as AxiosInstance
}

const axios = createInstance()
axios.CancelToken = new CancelToken()
axios.isCancel = isCancel

export default axios

export * from './types'