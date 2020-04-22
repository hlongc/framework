// 把虚拟节点渲染到container上面
export function render(vnode, container) {
  const dom = createEle(vnode) // 通过虚拟dom创建真实dom
  container.appendChild(dom)
}

// 根据虚拟节点创建真实节点
export function createEle(vnode) {
  const { tag, key, children, text, props } = vnode
  if (typeof tag === 'string') {
    // 每个虚拟dom都对应一个真实节点
    vnode.el = document.createElement(tag)
    // 更新属性
    updateProperties(vnode)
    // 递归渲染子孙
    children.forEach(child => {
      render(child, vnode.el)
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

// 更新节点的属性
function updateProperties(vnode, oldPops = {}) {
  const el = vnode.el
  const newProps = vnode.props || {} // 文本节点没有属性

  // 老节点中有的style在新节点中没有的话，需要删掉
  const oldStyle = oldPops.style || {}
  const newStyle = newProps.style || {}

  for (const styleName in oldStyle) {
    if (!newStyle.hasOwnProperty(styleName)) {
      el.style[key] = ''
    }
  }

  // 老节点中有的属性在新节点中没有的话，需要删掉
  for (const key in oldPops) {
    if (!newProps.hasOwnProperty(key)) {
      el.removeAttribute(key)
    }
  }

  if (newProps) {
    for (const key in newProps) {
      if (key === 'style') { // 单独处理style
        const styleObj = newProps.style
        const cssText = Object.keys(styleObj).map(attrName => {
          // 把backgroudColor => backgroud-color
          const attrName1 = attrName.replace(/([A-Z])/g, function() {
            return '-' + arguments[1].toLowerCase()
          })
          return `${attrName1}:${styleObj[attrName]}`
        }).join(';')
        el.style.cssText = cssText
      } else {
        el.setAttribute(key, newProps[key])
      }
    }
  }
}

export function patch(oldNode, newNode) {
  // 如果新老节点的tag不同，那么直接用新节点替换老节点
  if (oldNode.tag !== newNode.tag) {
    oldNode.el.parentNode.replaceChild(createEle(newNode), oldNode.el)
  }
  // 也有可能两个节点都是文本节点
  if (oldNode.tag === undefined) {
    // 文本内容的话，替换 
    if (oldNode.text !== newNode.text) {
      oldNode.el.textContent = newNode.text
    }
  }

  const el = newNode.el = oldNode.el // 如果类型一样复用真实dom节点
  updateProperties(newNode, oldNode.props) // 更新属性

  // 比较孩子
  const newChildren = newNode.children || []
  const oldChildren = oldNode.children || []

  if (newChildren.length && oldChildren.length) {
    // 如果新老节点都有孩子的话，那比较孩子
    updateChildren(el, oldChildren, newChildren)
  } else if (oldChildren.length === 0) {
    // 如果新节点有孩子，老节点没有孩子的话，那么插入新节点的孩子
    newChildren.forEach(child => {
      el.appendChild(createEle(child)) // 创建孩子节点的真实节点并且添加到父节点上面
    })
  } else if (newChildren.length === 0) {
    // 如果新节点没有孩子，老节点有孩子的话，那么直接删除老节点的孩子
    el.innerHTML = ''
  }
  return el
}

function isSameVnode(oldVnode, newVnode) {
  // 如果tag和key相同，就认为是同一个虚拟节点，可以复用
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}

// 更新孩子
function updateChildren(parent, oldChildren, newChildren) {
  let oldStartIndex = 0 // 老孩子节点开始索引
  let oldEndIndex = oldChildren.length - 1 // 结束索引
  let oldStartVnode = oldChildren[0] // 开始虚拟节点
  let oldEndVnode = oldChildren[oldEndIndex] // 结束虚拟节点

  let newStartIndex = 0
  let newEndIndex = newChildren.length - 1
  let newStartVnode = newChildren[0]
  let newEndVnode = newChildren[newEndIndex]

  // 老元素建立map映射 key和索引
  const map = oldChildren.reduce((memo, cur, index) => {
    memo[cur.key] = index
    return memo
  }, {})

  // 老的孩子节点和新的孩子节点只要有一个列表先结束比较那就结束
  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 有可能老元素的头节点和尾节点已经被移走了，那么跳过
    if (oldStartVnode === undefined) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldChildren[--oldEndIndex]
    } else if (isSameVnode(oldStartVnode, newStartVnode)) { // 如果头和头比一样的话，那就打补丁，并且移动索引
      // 如果相同那就用新属性去更新老的属性
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex] // 更新老的开始索引
      newStartVnode = newChildren[++newStartIndex] // 更新新的开始索引
    } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 尾和尾比
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex] // 老的尾指针往前面移动
      newEndVnode = newChildren[--newEndIndex] // 新的尾指针往前面移动
    } else if (isSameVnode(oldStartVnode, newEndVnode)) { // 头和尾相比,处理顺序颠倒的情况
      patch(oldStartVnode, newEndVnode)
      // 将老的头插到老的尾后面
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
      oldStartVnode = oldChildren[++oldStartIndex] // 老的头指针向后移动
      newEndVnode = newChildren[--newEndIndex] // 新的尾指针向前移动
    } else if (isSameVnode(oldEndVnode, newStartVnode)) { // 老的尾和新的头比较
      patch(oldEndVnode, newStartVnode)
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el) // 把老的尾插到老的头前面去
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else { // 乱序比较，头和头 头和尾 尾和头 尾和尾都不一样的情况
      const findIndex = map[newStartVnode.key]
      if (findIndex === undefined) { // 说明老元素不存在这个节点，那么直接插入到老元素头部前面
        parent.insertBefore(createEle(newStartVnode), oldStartVnode.el)
      } else { // 如果找到了，那也插入到前面
        const moveVnode = oldChildren[findIndex]
        oldChildren[findIndex] = undefined
        parent.insertBefore(moveVnode.el, oldStartVnode.el)
        patch(moveVnode, newStartVnode) // 打补丁
      }
      newStartVnode = newChildren[++newStartIndex] // 新的头指针向后移动
    }
  }

  if (newStartIndex <= newEndIndex) { // 如果新的开始索引还是小于等于新的结束索引，说明新的孩子节点新增了元素
    // target为基准元素，插入到该元素前面
    const target = newChildren[newEndIndex + 1] && newChildren[newEndIndex + 1].el
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.insertBefore(createEle(newChildren[i]), target) // 向父元素中添加新增的子元素
    }
  }

  // 说明老节点还有剩余的，删除多的
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        parent.removeChild(oldChildren[i].el)
      }
    }
  }
}