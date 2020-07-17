
import { createRoute } from '../create-matcher.js'

function runQueue (queue, iterator, out) {
  function next (index) {
    if (index === queue.length) return out()
    iterator(queue[index], () => next(++index))
  }
  next(0)
}
class History {
  constructor (router) {
    this.router = router
    const hash = window.location.hash ? window.location.hash.slice(1) : '/'
    this.current = createRoute(null, { path: hash })
    this.beforeEachs = []
  }

  transitionTo (path, callback) {
    // 用当前路径去匹配结果
    const r = this.router.match(path)
    // 路径相同就不跳转了
    if (r.path === this.current.path && r.matched.length === this.current.matched.length) {
      return
    }
    callback && callback()

    const iterator = (hook, next) => {
      hook(this.current, r, next)
    }
    runQueue(this.beforeEachs, iterator, () => {
      this.update(r)
    })
  }

  update (r) {
    this.current = r
    this.cb && this.cb(r)
  }

  setupListener () {
    // 监听hash变化，变化了就跳到对应的页面
    window.addEventListener('hashchange', () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }

  listen (cb) {
    this.cb = cb
  }
}

export default History
