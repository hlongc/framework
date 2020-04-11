const RESERVED = {
  ref: true,
  key: true,
  _self: true,
  _source: true,
  _owner: true
}

/**
 * @param {Object} node react元素
 * @param {HTMLNode} container 父容器
 */
function render(node, container) {
  // 如果是文本节点，那就直接添加并返回
  if (typeof node === 'string') return container.appendChild(document.createTextNode(node))
  let type = node.type
  let props = node.props
  if (type.prototype && type.prototype.isReactComponent) { // 说明是类组件,new 类，得到实例，调用实例的render方法，得到react元素
    const element = new type(props).render()
    type = element.type
    if (typeof type === 'function') { // 如果返回的还是一个函数，那么递归渲染，直到找到react元素为止
      return render(element, container)
    }
    props = element.props
  } else if (typeof type === 'function') { // 如果是函数式组件，那么执行函数并传入props属性，得到返回的react元素
    const element = type(props)
    type = element.type
    if (typeof type === 'function') { // 如果返回的还是一个函数，那么递归渲染，直到找到react元素为止
      return render(element, container)
    }
    props = element.props
  }

  const current = document.createElement(type)
  delete props.__source
  delete props.__self
  for (const propName in props) {
    if (RESERVED.hasOwnProperty(propName)) continue
    if (propName === 'children') {
      let children = props.children
      // 判断当前children是一个还是多个，都转为数组
      if (!Array.isArray(children)) children = [children]
      children.forEach(child => render(child, current))
    } else if (propName === 'className') {
      current.className = props.className
    } else if (propName === 'style') {
      const styleObj = props.style
      // for (const attr in styleObj) {
      //   current.style[attr] = styleObj[attr]
      // }
      const cssText = Object.keys(styleObj).map(attrName => {
        // 把backgroudColor => backgroud-color
        const attrName1 = attrName.replace(/([A-Z])/g, function() {
          return '-' + arguments[1].toLowerCase()
        })
        return `${attrName1}:${styleObj[attrName]}`
      }).join(';')
      current.style.cssText = cssText
    } else if (propName.startsWith('on')) { // 处理绑定事件
      handleEvent(current, propName, props[propName])
    } else if (!RESERVED.hasOwnProperty(propName)) {
      current.setAttribute(propName, props[propName])
    }
  }

  container.appendChild(current)
}

let syntheticEvent // 全局使用同一个合成事件对象，一般情况使用之后马上重置所有属性
function handleEvent(dom, eventName, listener) {
  eventName = eventName.slice(2).toLowerCase() // 把事件名称转换为小写
  const eventMap = dom.eventMap || (dom.eventMap = {}) // 获取元素上绑定的事件集合
  eventMap[eventName] = listener
  document.addEventListener(eventName, dispatchEvent, false) // 采用事件冒泡, true为事件捕获
}

class SyntheticEvent{
  constructor(nativeEvent) {
    this.nativeEvent = nativeEvent
  }
  persist() { // 把合成事件对象指向一个新的对象上，老对象可以继续引用，在重置的时候，是重置这个新对象
    syntheticEvent = { persist: this.persist.bind(this) }
  }
}

function dispatchEvent(e) {
  const { type, target } = e
  if (!syntheticEvent) {
    syntheticEvent = new SyntheticEvent(e)
  }
  syntheticEvent.nativeEvent = e
  syntheticEvent.currentTarget = target
  for (const key in e) {
    if (typeof key === 'function') {
      syntheticEvent[key] = e[key].bind(e)
    } else {
      syntheticEvent[key] = e[key]
    }
  }
  let current = target
  while (current) {
    // 最顶级的app元素没有eventMap属性，需要判断一下
    if (current.eventMap && current.eventMap[type]) { // 如果当前元素绑定了此类型的事件，就让它执行并传入合成事件对象
      current.eventMap[type].call(e, syntheticEvent)
    }
    current = current.parentNode // 事件冒泡
  }
  // 执行完毕以后重置事件对象
  for (const key in syntheticEvent) {
    syntheticEvent[key] = null
  }
}

export default {
  render
}