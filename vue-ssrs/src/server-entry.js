import createApp from './app'

// 如果从服务器上直接访问/foo 那么应该跳转到/foo, context为nodejs服务传过来的对象
export default (context) => {
  // 如果路由时动态渲染的，比如通过import语法，那么需要返回promise
  return new Promise(resolve => {
    const { app, router, store } = createApp()
    router.push(context.url)
    // 服务端才有的onReady方法，在路由渲染完成以后调用
    router.onReady(() => {
      // 找到当前匹配到的路由，并且调用它的asyncData方法
      const matchedComponents = router.getMatchedComponents() // 获取当前匹配到的路由，是个数组
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({ store }) // 传入store对象到asyncData方法里
        }
      })).then(() => {
        // 会把这个state挂载到window上的__INITIAL_STATE__属性上，在客户端取出然后替换掉state
        context.state = store.state
        context.meta = app.$meta() // 挂载meta插件
        // 所有asyncData调用完成以后再resolve出去app,服务端才能渲染出完整的页面，并且已经修改了状态
        resolve(app)
      })
    })
  })
}