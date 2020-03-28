export default {
  functional: true, // 表明当前是个函数式组件，没有this和data以及props，全靠传入的context对象
  render: function (h, { parent, data }) {
    const route = parent.$route
    // 因为macthed能匹配到多个记录
    let deps = 0 // 一开始处于第0个,因为router-view可以内部嵌套，所以要找到自己正确渲染的组件
    // $vnode 代表占位的虚拟节点比如 <router-view /> 而_vnode是代表router-view最终渲染出来的节点
    // 通过while算出当前的router-view在第几层
    while (parent.$vnode && parent.$vnode.data.routerView) {
      deps++
      parent = parent.$parent
    }
    data.routerView = true // 找到以后给当前的router-view一个标志符，以便子元素中的router-view使用
    const record = route.matched[deps] // 取出当前路由匹配到的记录
    if (!record) return h() // 如果当前是/about那么 /about/a的router-view就不该渲染返回空
    return h(record.component, data) // 渲染component,并把data传下去
  }
}
