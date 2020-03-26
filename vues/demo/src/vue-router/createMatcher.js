function createRouterMap(routes, oldPathList, oldPathMap) {
  oldPathList = oldPathList || []
  oldPathMap = oldPathMap || Object.create(null)
  routes.forEach(route => {
    addRouteRecord(route, oldPathList, oldPathMap)
  })
  return { pathList: oldPathList, pathMap: oldPathMap }
}

function addRouteRecord(route, oldPathList, oldPathMap, parent) {
  let { path, component } = route
  path = parent ? parent.path + '/' + path : path
  const record = {
    path,
    component,
    parent
  }
  if (!oldPathMap[path]) {
    oldPathList.push(path)
    oldPathMap[path] = record
  }
  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(child, oldPathList, oldPathMap, record)
    })
  }
}

export default function createMatcher(routes) {
  const { pathList, pathMap } = createRouterMap(routes)
  console.log(pathList, pathMap)
  // 动态增加路由的时候需要把之前的pathList, pathMap传进去
  function addRoutes(routes) {
    createRouterMap(routes, pathList, pathMap)
  }
  function match() {

  }
  return { addRoutes, match }
}
