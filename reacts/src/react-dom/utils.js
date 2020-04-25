import { handleEvent } from './event'

const RESERVED = {
  ref: true,
  key: true,
  _self: true,
  _source: true,
  _owner: true
}

export function onlyOne(node) {
  return Array.isArray(node) ? node[0] : node
}

export function flatten(arr) {
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

export function pacthProps(dom, oldProps, newProps) {
  // 老节点有的新节点没有，删除
  for (const key in oldProps) {
    if (key === 'children') continue
    if (!newProps.hasOwnProperty(key)) {
      dom.removeAttribute(key)
    }
  }
  // 新节点有点老节点没有新增
  // 新老节点都有的，更新
  setProps(dom, newProps)
}

// 处理元素的属性
export function setProps(dom, props) {
  delete props.__source
  delete props.__self
  for (const propName in props) {
    if (RESERVED.hasOwnProperty(propName)) continue
    if (propName === 'children') { // 孩子节点已经处理过了，跳过
      continue
    } else if (propName === 'className') { // 类名赋值
      dom.className = props.className
    } else if (propName === 'style') { // 处理样式
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