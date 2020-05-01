import createRouterMap from './create-router-map'
import { createRoute } from './history/base'

export default function createMatcher(routes) {
  const { pathList, pathMap } = createRouterMap(routes)
  // 动态增加路由的时候需要把之前的pathList, pathMap传进去
  function addRoutes(routes) {
    createRouterMap(routes, pathList, pathMap)
  }
  function match(path) {
    const record = pathMap[path]
    return createRoute(record, { path })
  }
  return { addRoutes, match }
}
