import createApp from './app'

// 如果从服务器上直接访问/foo 那么应该跳转到/foo, context为nodejs服务传过来的对象
export default (context) => {
  // 如果路由时动态渲染的，比如通过import语法，那么需要返回promise
  return new Promise(resolve => {
    const { app, router } = createApp()
    router.push(context.url)
    // 服务端才有的onReady方法，在路由渲染完成以后调用
    router.onReady(() => {
      // 渲染完成以后再resolve出去app,服务端才能渲染出完整的页面
      resolve(app)
    })
  })
}