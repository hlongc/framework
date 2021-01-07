function patchStyle(el: HTMLElement, prev: any, next: any) {
  const style = el.style
  if (!next) { // 如果新的样式不存在，那么直接移除style
    el.removeAttribute('style')
  } else {
    for (const key in next) { // 遍历新样式赋值
      style[key as any] = next[key]
    }
    if (prev) {
      for (const k in prev) { // 遍历老样式，删除新样式不包含的值
        if (!next[k]) {
          style[k as any] = ''
        }
      }
    }
  }
}

function patchClassName(el: HTMLElement, next: any) {
  if (!next) { // 为null undefined直接设置为空
    next = ''
  }
  el.className = next
}

function patchAttrs(el: HTMLElement, key: any, next: any) {
  if (!next) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, next)
  }
}

export function patchProps(el: HTMLElement, key: any, prev: any, next: any) {
  switch (key) {
    case 'style': // 处理样式
      patchStyle(el, prev, next)
      break;
    case 'className': // 处理类名
      patchClassName(el, next)
      break
    default:
      patchAttrs(el, key, next)
  }
}