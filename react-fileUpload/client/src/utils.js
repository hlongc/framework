export function http(options) {
  // debugger
  const defaultOptions = {
    baseUrl: 'http://localhost:8000',
    method: 'GET',
    headers: {},
    data: {}
  }
  options = { ...defaultOptions, ...options, headers: { ...defaultOptions.headers, ...(options.headers || {}) }, data: options.data || defaultOptions.data }
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(options.method, options.baseUrl + options.url)
    if (options.setXHR) {
      options.setXHR(xhr)
    }
    xhr.responseType = 'json'
    Object.entries(options.headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.upload.onprogress = options.onprogress || function() {}
    xhr.onreadystatechange = function() {
      // 4代表请求完成
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(xhr.response)
        } 
      }
    }
    xhr.send(options.data)
  })
}