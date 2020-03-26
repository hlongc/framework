import { cloneDeep } from 'lodash'
let Vue

const install = _Vue => {
  if (!Vue) Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

function forEach(obj, cb) {
  Object.keys(obj).forEach(key => cb(key, obj[key]))
}

class ModuleCollection {
  constructor(options) {
    this.register([], options)
  }
  // 递归注册模块
  register(path, parentModule) {
    const rowModule = {
      _row: parentModule,
      state: parentModule.state,
      children: {}
    }
    parentModule.rowModule = rowModule // 记录下格式化后的数据

    if (path.length === 0) {
      this.root = rowModule
    } else {
      // 找到父级元素
      const parent = path.slice(0, -1).reduce((memo, moduleName) => {
        return memo.children[moduleName]
      }, this.root)
      // 给父级元素设置儿子
      parent.children[path[path.length - 1]] = rowModule
    }
    if (parentModule.modules) {
      forEach(parentModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

// 每次拿到最新的state
function getState(store, path) {
  return path.reduce((local, cur) => {
    return local[cur]
  }, store.state)
}

function installModule(store, rootState, path, rowModule) {
  let root = cloneDeep(store.modules.root)
  // 获取当前模块的命名空间
  let namespaced = path.reduce((str, cur) => {
    root = root.children[cur]
    str += root._row.namespaced ? `${cur}/` : ''
    return str
  }, '')
  // 安装每个子模块的state
  if (path.length) { // 如果是子级，那么将状态定义到父级上面,代码中可以通过a.b.c.name的方式拿到state
    const parent = path.slice(0, -1).reduce((memo, moduleName) => {
      return memo[moduleName]
    }, rootState)
    Vue.set(parent, path[path.length - 1], rowModule.state)
  }

  const getters = rowModule._row.getters
  if (getters) {
    forEach(getters, (getterName, value) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          // 确保在使用replaceState以后还能拿到最新
          return value.call(store, getState(store, path))
        }
      })
    })
  }

  const mutations = rowModule._row.mutations
  if (mutations) {
    forEach(mutations, (mutationName, value) => {
      const mutationArray = store.mutations[namespaced + mutationName] || (store.mutations[namespaced + mutationName] = [])
      mutationArray.push((payload) => {
        value.call(store, getState(store, path), payload)
        // mutation触发时执行所有订阅好的方法
        store.plugins.forEach(fn => fn({ mutation: namespaced + mutationName, payload }, store.state))
      })
    })
  }

  const actions = rowModule._row.actions
  if (actions) {
    forEach(actions, (actionName, value) => {
      const actionArray = store.actions[namespaced + actionName] || (store.actions[namespaced + actionName] = [])
      actionArray.push((payload) => {
        value.call(store, store, payload)
      })
    })
  }

  forEach(rowModule.children, (moduleName, module) => {
    installModule(store, rootState, path.concat(moduleName), module)
  })
}

class Store {
  constructor(options) {
    this.options = options
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    this.plugins = []

    this.modules = new ModuleCollection(options)
    installModule(this, this.state, [], this.modules.root)

    // 执行每个插件
    if (Array.isArray(options.plugins)) {
      options.plugins.forEach(plugin => plugin(this))
    }
  }

  commit = (mutation, payload) => {
    this.mutations[mutation].forEach(fn => fn(payload))
  }

  dispatch = (action, payload) => {
    this.actions[action].forEach(fn => fn(payload))
  }

  get state() {
    return this.vm.state
  }
  // 订阅函数，当mutation执行时会依次执行
  subscribe(fn) {
    this.plugins.push(fn)
  }

  // 替换state
  replaceState(newState) {
    this.vm.state = newState
  }

  registerModule(moduleName, module) {
    if (!Array.isArray(moduleName)) moduleName = [moduleName]
    this.modules.register(moduleName, module) // 注册模块
    installModule(this, this.state, moduleName, module.rowModule) // 安装新模块
  }
}

export function mapState(states) {
  const obj = {}
  if (Array.isArray(states)) {
    states.forEach(stateName => {
    obj[stateName] = function() {
      return this.$store.state[stateName]
    }
  })
  } else if (states.toString().slice(-7, -1) === 'Object') {
    Object.entries(states).forEach(([rename, realName]) => {
      obj[rename] = function() {
        // 处理重命名深度取值的情况 z: 'a.c.z',先取a => c => z
        return realName.split('.').reduce((state, cur) => {
          return state[cur]
        }, this.$store.state)
      }
    })
  }
  return obj
}

export function mapGetters(getters) {
  const obj = {}
  if (Array.isArray(getters)) {
    getters.forEach(getterName => {
    obj[getterName] = function() {
      return this.$store.getters[getterName]
    }
  })
  } else {
    consol.error(`mapGetter函数参数只能为数组`)
  }
  return obj
}

export function mapMutations(mutations) {
  const obj = {}
  if (Array.isArray(mutations)) {
    mutations.forEach(mutationName => {
    obj[mutationName] = function(payload) {
      this.$store.commit(mutationName, payload)
    }
  })
  } else if (mutations.toString().slice(-7, -1) === 'Object') {
    Object.entries(mutations).forEach(([rename, realName]) => {
      obj[rename] = function(payload) {
        this.$store.commit(realName, payload)
      }
    })
  }
  return obj
}

export function mapActions(actions) {
  const obj = {}
  if (Array.isArray(actions)) {
    actions.forEach(actionName => {
    obj[actionName] = function(...payload) {
      this.$store.dispatch(actionName, ...payload)
    }
  })
  } else if (actions.toString().slice(-7, -1) === 'Object') {
    Object.entries(actions).forEach(([rename, realName]) => {
      obj[rename] = function(...payload) {
        this.$store.dispatch(realName, ...payload)
      }
    })
  }
  return obj
}

export default {
  install,
  Store
}
