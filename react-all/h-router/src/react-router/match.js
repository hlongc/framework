import PathToRegexp from 'path-to-regexp'

export function matchUrl({ path, pathname, exact }) {
  const keys = []
  const reg = PathToRegexp(path, keys, { end: exact })
  const match = reg.exec(pathname)
  if (match) {
    const [url, ...values] = match
    const params = keys.map(item => item.name).reduce((memo, cur, index) => {
      memo[cur] = values[index]
      return memo
    }, {})
    const isExact = url === pathname
    // 要的是精准匹配，但是不是精准匹配，直接返回Null
    if (exact && !isExact) return null
    return {
      url,
      path,
      params,
      isExact
    }
  }
  return null
}