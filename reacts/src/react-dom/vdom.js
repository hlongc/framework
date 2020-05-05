import { TEXT, ELEMENT, CLASS_COMPONENT } from '../react/constant'
import { onlyOne, setProps } from './utils'
import { unstable_batchedUpdates } from './index'

// 创建子元素节点
function createChildren(parentContainer, parentVNode) {
  parentVNode.props.children.flat(Infinity).forEach((child, index) => {
    if (!child) {
      parentContainer.appendChild(document.createTextNode(''))
    } else {
      const dom = createDOM(child) // 递归创建孩子节点
      child._mountIndex = index // 此索引会在dom-diff时用到,标记它在父元素中子节点的位置
      child.dom = dom // 虚拟节点和真实节点对应
      parentContainer.appendChild(dom)
    }
  })
}

// 创建原生dom元素
function createNativeDOM(vnode) {
  const { type, props } = vnode
  const dom = document.createElement(type) // 创建当前元素
  createChildren(dom, vnode) // 创建子元素
  setProps(dom, props)
  if (vnode.ref) {
    vnode.ref.current = dom
  }
  return dom
}

// 生成类组件元素
function createClassComponentDOM(vnode) {
  const { type: Component, props } = vnode
  const instance = new Component(props) // 创建实例
  if (vnode.ref) {
    vnode.ref.current = instance
  }
  if (Component.contextType) { // 处理静态属性
    instance.context = Component.contextType.Provider.value
  }
  if (instance.componentWillMount) {
    unstable_batchedUpdates(() => instance.componentWillMount())
  }
  if (Component.getDerivedStateFromProps) {
    const partialState = Component.getDerivedStateFromProps(props, instance.state)
    if (partialState) {
      instance.state = { ...instance.state, ...partialState }
    }
  }
  const renderElement = instance.render() // 获取到返回的react元素
  const dom = createDOM(renderElement)
  if (instance.componentDidMount) {
    unstable_batchedUpdates(() => instance.componentDidMount())
  }
  vnode.instance = instance // 记录当前虚拟dom的实例
  instance.renderElement = renderElement
  if (Object.prototype.toString.call(vnode).slice(8, -1) !== 'Object') {
    renderElement.dom = dom // 当前实例对应的真实dom元素
  }
  return dom
}

// 生成函数式组件元素
function createFunctionComponentDOM(vnode) {
  const { type, props } = vnode
  const renderElement = type(props)
  const dom = createDOM(renderElement)
  vnode.renderElement = renderElement
  vnode.renderElement.dom = dom
  return dom
}

// 通过虚拟dom创建真实节点
export function createDOM(vnode) {
  vnode = onlyOne(vnode)
  // 如果不是对象直接渲染为文本节点
  if (Object.prototype.toString.call(vnode).slice(8, -1) !== 'Object') {
    const textContent = typeof vnode === 'number' ? vnode : ''
    return document.createTextNode(textContent)
  }
  const { $$typeof, type } = vnode
  let dom = null
  if (!$$typeof) { // ReactDOM.render('hhh', document.getElementById('root'))，这种情况就没有$$typeof
    dom = document.createTextNode(type)
  } else if ($$typeof === TEXT) { // 创建文本节点
    dom = document.createTextNode(vnode.content)
  } else if($$typeof === ELEMENT) { // 如果是普通标签那就创建原生dom
    dom = createNativeDOM(vnode)
  } else if ($$typeof === CLASS_COMPONENT) { // 类组件
    dom = createClassComponentDOM(vnode)
  } else {
    dom = createFunctionComponentDOM(vnode) // 函数组件
  }
  vnode.dom = dom // 虚拟节点和真实节点对应
  return dom  
}