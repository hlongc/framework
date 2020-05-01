export default function createRouterMap(routes, oldPathList = [], oldPathMap = {}) {
  routes.forEach(route => {
    addRouteRecord(route, oldPathList, oldPathMap)
  })
  return { pathList: oldPathList, pathMap: oldPathMap }
}

function addRouteRecord(route, oldPathList, oldPathMap, parent) {
  let { path, component } = route
  // 用父路由的路径进行拼接
  path = parent ? parent.path + '/' + path : path
  const record = {
    path,
    component,
    parent
  }
  // 不存在该路径就存入
  if (!oldPathMap[path]) {
    oldPathList.push(record)
    oldPathMap[path] = record
  }
  // 递归给孩子添加
  const children = route.children
  if (children && Array.isArray(children)) {
    children.forEach(child => {
      addRouteRecord(child, oldPathList, oldPathMap, record)
    })
  }
}
