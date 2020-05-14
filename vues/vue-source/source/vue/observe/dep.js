let id = 0

class Dep {
  constructor() {
    this.id = ++id
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() { // 发生变化了通知watcher进行更新
    this.subs.forEach(watcher => watcher.update())
  }
  depend() {
    // Dep.target就是渲染watcher
    if (Dep.target) {
      Dep.target.addDep(this) // 让watcher记住当前的dep
    }
  }
}

let stack = []
export function pushWatcher(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
export function popWatcher() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}

export default Dep // 进行依赖收集