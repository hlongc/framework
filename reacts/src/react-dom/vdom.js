import { handleEvent } from './event'

function flatten(arr) {
  let res = []
  if (arr && arr.length) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        res = res.concat(flatten(item))
      } else {
        res.push(item)
      }
    })
  }
  return res
}

const RESERVED = {
  ref: true,
  key: true,
  _self: true,
  _source: true,
  _owner: true
}

// 创建子元素节点
function createChildren(parentContainer, parentVNode) {
  if (parentVNode.props.children && parentVNode.props.children.length) {
    parentVNode.props.children.flat(Infinity).forEach((child, index) => {
      const dom = createDOM(child)
      child._mountIndex = index // 此索引会在dom-diff时用到
      child.dom = dom
      parentContainer.appendChild(dom)
    })
  }
}

function setProps(dom, props) {
  delete props.__source
  delete props.__self
  for (const propName in props) {
    if (RESERVED.hasOwnProperty(propName)) continue
    if (propName === 'children') { // 孩子节点已经处理过了，跳过
      continue
    } else if (propName === 'className') {
      dom.className = props.className
    } else if (propName === 'style') {
      const styleObj = props.style
      // 这种写法会导致多次重绘与回流，并且要处理float: dom.cssFloat = 'left'
      // for (const attr in styleObj) {
      //   dom.style[attr] = styleObj[attr]
      // }
      // 使用下列方法一次性处理好再修改属性，降低渲染成本
      const cssText = Object.keys(styleObj).map(attrName => {
        // 把backgroudColor => backgroud-color
        const attrName1 = attrName.replace(/([A-Z])/g, function() {
          return '-' + arguments[1].toLowerCase()
        })
        return `${attrName1}:${styleObj[attrName]}`
      }).join(';')
      dom.style.cssText = cssText
    } else if (propName.startsWith('on')) { // 处理绑定事件
      handleEvent(dom, propName, props[propName])
    } else if (!RESERVED.hasOwnProperty(propName)) {
      dom.setAttribute(propName, props[propName])
    }
  }
}

// 创建原生dom元素
function createNativeDOM(vnode) {
  const { type, props } = vnode
  const dom = document.createElement(type) // 创建当前元素
  createChildren(dom, vnode) // 创建子元素
  setProps(dom, props)
  return dom
}
// 生成类组件元素
function createClassComponentDOM(vnode) {
  const { type: Component, props } = vnode
  const instance = new Component(props) // 创建实例
  const renderElement = instance.render() // 获取到返回的react元素
  const dom = createDOM(renderElement)
  vnode.instance = instance // 记录当前虚拟dom的实例
  vnode.renderElement = renderElement
  vnode.dom = dom // 当前实例对应的真实dom元素
  return dom
}

// 生成函数式组件元素
function createFunctionComponentDOM(vnode) {
  const { type, props } = vnode
  const renderElement = type(props)
  const dom = createDOM(renderElement)
  vnode.renderElement = renderElement
  vnode.dom = dom
  return dom
}


function createDOM(vnode) {
  const { $$typeof, type } = vnode
  let dom = null
  if (!$$typeof) { // 不存在这个属性说明不是react元素，是文本节点
    dom = document.createTextNode(vnode.content || vnode)
  } else {
    if (typeof type === 'string') { // 表明当前就是一个普通的html标签, 直接创建
      dom = createNativeDOM(vnode)
    } else if (typeof type === 'function') {
      if (type.prototype.isReactComponent) { // 类组件才拥有此属性
        dom = createClassComponentDOM(vnode) // 类组件
      } else {
        dom = createFunctionComponentDOM(vnode) // 函数组件
      }
    }
  }
  return dom  
}

export {
  createDOM
}