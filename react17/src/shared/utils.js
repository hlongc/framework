import { REACT_TEXT } from './constant'

export const isFunction = val => typeof val === 'function'

export const isPlain = val => typeof val === 'number' || typeof val === 'string'

/**
 * 将字符串和数字包裹为vnode
 * @param {*} node 
 */
export function wrapVNode(node) {
  return isPlain(node) ? { type: REACT_TEXT, props: { content: node } } : node
}

/**
 * 执行类的静态方法getDerivedStateFromProps并返回更新后的状态
 * @param {*} Constructor 类组件
 * @param {*} nextProps 下次的props
 * @param {*} nextState 下次的state
 */
export function runGetDerivedStateFromProps(instance, nextProps, nextState) {
  // 存在 getDerivedStateFromProps 就不调用 componentWillReceiveProps
  if (isFunction(instance.constructor.getDerivedStateFromProps)) {
    const ret = instance.constructor.getDerivedStateFromProps(nextProps, nextState)
      if (typeof ret !== 'object') {
        console.error('getDerivedStateFromProps should return object or null')
      } else if (ret !== null) {
        nextState = { ...nextState, ...ret }
      }
  } else {
    // 组件挂载完成才会调用componentWillReceiveProps方法
    if (instance.mounted) {
      runHooks(instance, 'componentWillReceiveProps', nextProps, nextState)
    }
  }
  return nextState
}

const hookDefaultReturn = {
  shouldComponentUpdate: true,
  getDerivedStateFromProps: null,
  getSnapshotBeforeUpdate: undefined
}
/**
 * 执行实例的生命周期
 * @param {*} instance 
 * @param {*} hook 
 */
export function runHooks(instance, hook) {
  if (instance && isFunction(instance[hook])) {
    return instance[hook].call(instance, ...([].slice.call(arguments, 2)))
  }
  if (hook in hookDefaultReturn) {
    return hookDefaultReturn[hook]
  }
}