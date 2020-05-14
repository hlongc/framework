// ?: 匹配不捕获
// . 匹配任意字符
// \r\n匹配回车和换行
// + 至少匹配一个
// ? 尽可能的少匹配
const defaultReg = /\{\{((?:.|\r?\n)+?)\}\}/

const util = {
  getValue(vm, expr) {
    const keys = expr.split('.') // {{ info.name }} => [info, name]
    return keys.reduce((memo, cur) => memo[cur], vm)
  },
  compileText(node, vm) { // 编译文本 替换{{ info.name }}
    // 替换文本内容
    node.templateStr = node.templateStr || node.textContent // 记住第一次模板，在后面解析使用
    node.textContent = node.templateStr.replace(defaultReg, function() {
      // 对捕获的进行空格删除
      const res = util.getValue(vm, arguments[1].trim())
      // 如果是对象或者数组，就序列化输出
      return typeof res === 'object' ? JSON.stringify(res) : res
    })
  }
}

export function compiler(node, vm) {
  let childNodes = node.childNodes;
  [...childNodes].forEach(node => {
    if (node.nodeType === 1) { // 1表示元素
      compiler(node, vm) // 如果是元素则递归编译
    } else if (node.nodeType === 3) { // 3表示文本节点
      util.compileText(node, vm)
    }
  })
}

export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]

const strategy = {}

LIFECYCLE_HOOKS.forEach(hook => {
  strategy[hook] = mergeHook
})

function mergeHook(old, news) {
  if (old && news) {
    return old.concat(news)
  } else if (old) {
    return [old]
  } else {
    return [news]
  }
}

export function callHook(vm, hook) {
  const hooks = vm.$options[hook]
  if (hooks) {
    hooks.forEach(hook => hook.call(vm))
  }
}

export function mergeOptions(parent, child) {
  const options = {}
  function mergeField(key) {
    // 如果都是对象，那么进行合并
    if (strategy[key]) {
      return options[key] = strategy[key](parent[key], child[key])
    }
    if (typeof parent[key] === 'object' && parent[key] !== null && typeof child[key] === 'object' && child[key] !== null) {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    } else if (parent[key] && !child[key]) { // 如果儿子没有，父亲那就用父亲的
      options[key] = parent[key]
    } else { // 如果都有且不是对象，那就用儿子的覆盖父亲的
      options[key] = child[key]
    }
  }
  for (const key in parent) {
    mergeField(key)
  }

  for (const key in child) {
    if (!parent.hasOwnProperty(key)) { // 已经合并过的属性就不用再合并了
      mergeField(key)
    }
  }
  return options
}