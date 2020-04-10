import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const baseURL = 'http://localhost:3333'

interface User {
  name: string;
  password: string;
  age?: number;
}

interface Human {
  height: number;
  weight: number;
  [prop:string]: any;
}

const user: User = { name: 'hlc', password: 'xixi', age: 1 }
console.time('request')

const cancelToken = axios.CancelToken
const source = cancelToken.source()

axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers.name += 1
  console.log('第request一个拦截器')
  console.timeEnd('request')
  return config
})

const request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers.name += 2
  console.log('第request二个拦截器')
  return config
})

axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      config.headers.name += 3
      console.log('第request三个拦截器')
      resolve(config)
      // reject('请求主动失败')
    }, 3000)
  })
})

axios.interceptors.request.eject(request)

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse  => {
  console.log('第一个response拦截器')
  return response
})

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse  => {
  console.log('第二个response拦截器')
  return response
})

const response = axios.interceptors.response.use((response: AxiosResponse): AxiosResponse  => {
  console.log('第三个response拦截器')
  return response
})

axios.interceptors.response.eject(response)

axios({ 
  url: baseURL + '/info', 
  method: 'get', 
  params: user,
  cancelToken: source.token,
  headers: { name: 'hlc' }
}).then((res: AxiosResponse) => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

source.cancel('我取消了请求')

// axios({ 
//   url: baseURL + '/postinfo', 
//   method: 'post', 
//   headers: { 'content-type': 'application/json' },
//   data: { name: 'xixi' }
// }).then((res: AxiosResponse) => {
//   console.log(res)
// })

// axios({ 
//   url: baseURL + '/timeout?time=3000', 
//   method: 'get', 
//   params: user ,
//   timeout: 1000
// }).then((res: AxiosResponse) => {
//   console.log(res)
// })

// axios({ 
//   url: baseURL + '/statusCode?code=400', 
//   method: 'get', 
//   params: user
// }).then((res: AxiosResponse) => {
//   console.log(res)
// })