/**
 * 更新dom的style
 * @param el dom
 * @param prev 之前的style
 * @param next 新的style
 */
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

/**
 * 更新dom的className
 * @param el dom
 * @param next 最新的className
 */
function patchClassName(el: HTMLElement, next: any) {
  if (!next) { // 为null undefined直接设置为空
    next = ''
  }
  el.className = next
}

/**
 * 更新dom的属性
 * @param el dom
 * @param key 属性名
 * @param next 属性值
 */
function patchAttrs(el: HTMLElement, key: any, next: any) {
  if (!next) {
    el.removeAttribute(key)
  } else if (key !== 'key') { // key不显示到页面上
    el.setAttribute(key, next)
  }
}

/**
 * 更新dom上属性对应的值
 * @param el dom container
 * @param key 需要处理的属性
 * @param prev 之前的值
 * @param next 新值
 */
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