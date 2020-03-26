let Vue
const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key])
  })
}

class CollectionModules {
  constructor (option) {
    this.register([], option)
  }
  register (path, rootModule) {
    let newModule = {
      _row: rootModule,
      _children: {},
      state: rootModule.state
    }
    if (path.length === 0) {
      this.root = newModule
    } else {
      let parent = path.slice(0, -1).reduce((root, module) => {
        return root._children[module]
      }, this.root)
      parent._children[path[path.length - 1]] = newModule
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

const installModules = (store, state, path, rootModule) => {
  if (path.length > 0) { // 进行state合并
    let parent = path.slice(0, -1).reduce((root, current) => {
      return root[current]
    }, state)
    Vue.set(parent, path[path.length - 1], rootModule.state)
  }
  const getters = rootModule._row.getters
  if (getters) { // getters挂载到根节点
    forEach(getters, (gettersName, fn) => {
      Object.defineProperty(store.getters, gettersName, {
        get: () => {
          return fn.call(store, rootModule.state)
        }
      })
    })
  }

  const mutations = rootModule._row.mutations
  if (mutations) { // mutations挂载到根节点
    forEach(mutations, (mutationName, fn) => {
      let arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
      arr.push((payload) => {
        fn.call(store, rootModule.state, payload)
      })
    })
  }

  const actions = rootModule._row.actions
  if (actions) { // actions挂载到根节点
    forEach(actions, (actionsName, fn) => {
      let arr = store.actions[actionsName] || (store.actions[actionsName] = [])
      arr.push((payload) => {
        fn.call(store, store, payload)
      })
    })
  }

  if (rootModule._children) {
    forEach(rootModule._children, (moduleName, module) => {
      installModules(store, state, path.concat(moduleName), module)
    })
  }
}

class Store {
  constructor (option) {
    this._vm = new Vue({
      data: {
        state: option.state
      }
    })
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    // 解决this绑定的问题
    // let { dispatch, commit } = this
    // this.dispatch = function () {
    //   dispatch.call(this)
    // }
    // this.commit = function () {
    //   commit.call(this)
    // }

    this.module = new CollectionModules(option)
    installModules(this, this.state, [], this.module.root)
  }
  dispatch = (type, payload) => {
    this.actions[type].forEach(fn => fn(payload))
  }
  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload))
  }
  get state () {
    return this._vm.state
  }
}

// vue中的插件默认会调用install方法，并且传入vue构造函数和其余参数
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      // 为每个组件加上$store
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  install,
  Store
}
