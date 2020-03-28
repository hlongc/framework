export default function createRouterMap(routes, oldPathList, oldPathMap) {
  oldPathList = oldPathList || []
  oldPathMap = oldPathMap || Object.create(null)
  routes.forEach(route => {
    addRouteRecord(route, oldPathList, oldPathMap)
  })
  return { pathList: oldPathList, pathMap: oldPathMap }
}

function addRouteRecord(route, oldPathList, oldPathMap, parent) {
  let { path, component } = route
  // 如果有父级，需要加上父级的前缀
  path = parent ? parent.path + '/' + path : path
  // 记录当前的父级
  const record = {
    path,
    component,
    parent
  }
  if (!oldPathMap[path]) {
    oldPathList.push(path)
    oldPathMap[path] = record
  }
  // 存在儿子就递归添加
  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(child, oldPathList, oldPathMap, record)
    })
  }
}
