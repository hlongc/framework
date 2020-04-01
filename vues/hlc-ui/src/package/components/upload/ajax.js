export default function ajax(options) {
  // 创建formdata对象
  const fd = new FormData()
  fd.append(options.name, options.file)
  // 创建xhr对象
  const xhr = new XMLHttpRequest()
  const url = options.action
  // 打开xhr链接
  xhr.open('post', url, true)

  xhr.onerror = function(err) {
    options.onError(err)
  }

  xhr.onload = function() {
    const data = xhr.responseText || xhr.response // 默认是字符串
    options.onSuccess(JSON.parse(data))
  }

  xhr.upload.onprogress = function(e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100
    }
    options.onProgress(e)
  }

  // 发送请求
  xhr.send(fd)
  return xhr
}