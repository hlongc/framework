export default {
  functional: true,
  render(h, { parent, data }) {
    // 取出当前匹配到的路由
    const matched = parent.$route.matched
    let depth = 0
    // 递归找出当前router-view所在的深度
    while(parent) {
      // $vnode代表<router-view />这个占位符
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent // 递归往上面找
    }
    data.routerView = true // 设置标志符，标记当前这个占位符是一个router-view组件
    const record = matched[depth] // 取出当前router-view匹配到的路由记录
    if (!record) return h() // 也可能没匹配到当前router-view,比如访问/
    return h(record.component, data) // 渲染并把数据往下面传递
  }
}
