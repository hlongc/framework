import axios, { AxiosResponse, AxiosRequestConfig } from './axios'

interface User {
  name: string;
  age: number;
}
const baseURL = 'http://localhost:3344'
const user: User = { name: 'hlongc', age: 25 }


axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('request 1')
  return config
})

const index = axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('request 2')
  return config
})

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('request 3')
  return config
})

axios.interceptors.request.eject(index)

axios.interceptors.response.use((response: AxiosResponse) => {
  console.log('response 1')
  return response
})

axios.interceptors.response.use((response: AxiosResponse) => {
  console.log('response 2')
  return response
})

const idx = axios.interceptors.response.use((response: AxiosResponse) => {
  console.log('response 3')
  return response
})

axios.interceptors.response.eject(idx)

const source = axios.CancelToken.source()

axios({
  baseURL,
  // url: '/status?status=500',
  // url: '/get/query',
  url: '/post',
  params: user,
  data: { name: 'hulongchao', age: 25 },
  method: 'post',
  timeout: 3000,
  headers: {
    name: 'hhh'
  },
  cancelToken: source.token
}).then((res: AxiosResponse<User>) => {
  console.log(res.data)
}).catch((error: any) => {
  if (axios.isCancel(error)) {
    console.log('取消', error)
  } else {
    console.log('error', error)
  }
})

source.cancel('取消请求')