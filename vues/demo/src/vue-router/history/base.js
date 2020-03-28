export function createRoute(record, location = {}) {
  const res = []
  if (record) {
    while (record) { // 递归添加，如果有父元素，那么把父元素也添加进去
      res.unshift(record) // 此处只能添加在最前面，因为在router-view组件渲染的时候，是从父往子寻找
      record = record.parent
    }
  }
  return { ...location, matched: res }
}

export default class History {
  constructor(router) {
    this.router = router
    // 当前路径匹配的结果 { path, matcher }
    this.current = createRoute(null, { path: '/' })
  }
  transitionTo(path, callback) {
    const r = this.router.match(path)
    // 路由不改变就不跳转
    if (path === this.current.path && r.matched.length === this.current.matched.length) return
    this.current = r
    this.cb && this.cb(r) // 路由变化时去更新_route刷新视图
    callback && callback()
  }
  listen(cb) {
    this.cb = cb
  }
}
