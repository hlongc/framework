import pathToRegExp from 'path-to-regexp'

export default function matchUrl({ pathname, path, exact = false }) {
  const keys = []
  const reg = pathToRegExp(path, keys, { end: exact })
  const match = pathname.match(reg)
  if (match) {
    const [url, ...values] = match
    const isExact = url === pathname
    if (exact && !isExact) return null
    const params = keys.map(item => item.name).reduce((memo, key, index) => {
      memo[key] = values[index]
      return memo
    }, {})
    return {
      url,
      isExact,
      params
    }
  } else {
    return null
  }
}