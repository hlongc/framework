import createRouteMap from './create-route-map'

// 根据记录返回匹配结果
export function createRoute(record, location) {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return { matched: res, ...location }
}

export default function createMatcher(routes) {
  // 第一次根据传入的routes创建一个映射表和list
  const { pathList, pathMap } = createRouteMap(routes)
  // 新增routes
  function addRoutes(newRoutes) {
    createRouteMap(newRoutes, pathList, pathMap)
  }
  function match(path) {
    const record = pathMap[path]
    return createRoute(record, { path })
  }
  return {
    addRoutes,
    match
  }
}
