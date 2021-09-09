const url = 'https://www.baidu.com?a=1&b=2&c=3&a=4&e=&f=6'

// 解析query参数
function parse(url) {
  const [, query] = url.split('?')
  const list = query.split('&')
  const ret = {}
  for (const item of list) {
    const [key, value] = item.split('=')
    if (Reflect.has(ret, key)) {
      const v = ret[key]
      if (Array.isArray(v)) {
        v.push(value)
      } else {
        ret[key] = [v, value]
      }
    } else {
      ret[key] = value
    }
  }
  return ret
}

console.log(parse(url))