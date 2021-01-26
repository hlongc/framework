import { createAppApi } from './apiCreateApp'
import type { VNodeProps } from './vnode'
import { ShapeFlags } from '../shared/shapeFlags'
import { createComponentInstance, setupComponent } from './component'
import type { ComponentProps } from './component'
import { effect } from '../reactivity'

export interface OptionsType {
  createElement: (type: any) => HTMLElement;
  insert: (child: HTMLElement, parent: HTMLElement, anchor?: null | HTMLElement) => void;
  remove: (child: HTMLElement) => void;
  setElementText: (child: HTMLElement, text: string) => void;
  createTextElement: (content: string) => Text;
  patchProps: (el: HTMLElement, key: any, prev: any, next: any) => void;
} 

export * from './h'
export function createRenderer(nodeOps: OptionsType) {
  const {
    createElement: hostCreateElement,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
    createTextElement: hostCreateTextElement,
    patchProps: hostPatchProps
  } = nodeOps
  // 打补丁

  /**
   * 处理元素类型
   * @param prev old vnode 
   * @param next new vnode
   * @param el dom container
   * @param anchor 锚点
   */
  const processElement = (prev: any, next: VNodeProps, el: HTMLElement, anchor: HTMLElement | null = null) => {
    if (!prev) { // 不存在prev表示是第一次挂载
      mountElement(next, el, anchor)
    } else {
      patchElement(prev, next, el)
    }
  }

  /**
   * 处理组件类型
   * @param prev old vnode
   * @param next new vnode
   * @param el dom container
   */
  const processComponent = (prev: any, next: VNodeProps, el: HTMLElement) => {
    if (!prev) {
      mountComponent(next, el)
    } else {
      updateComponent(prev, next, el)
    }
  }
  /**
   * 两个节点类型是否相同
   * @param n1 虚拟节点1
   * @param n2 虚拟节点2
   * @returns boolean
   */
  const isSameVNodeType = (n1: VNodeProps, n2: VNodeProps) => {
    return n1.type === n2.type && n1.key === n2.key
  }

  /**
   * 给两个vnode打补丁
   * @param prev 之前的虚拟节点
   * @param next 新的虚拟节点
   * @param el dom容器
   * @param anchor 锚点
   */

  const patch = (prev: VNodeProps | null, next: VNodeProps, el: HTMLElement, anchor: HTMLElement | null = null) => {
    if (prev && prev.el && !isSameVNodeType(prev, next)) { // 如果前后类型不同，那么删除直接重新创建
      hostRemove(prev.el)
      prev = null
    }
    const { shapeFlag } = next
    if (shapeFlag & ShapeFlags.ELEMENT) { // 当前父元素是元素类型
      processElement(prev, next, el, anchor) // 处理元素
    }
    if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) { // 当前组件类型
      processComponent(prev, next, el) // 处理组件
    }
  }
  /**
   * 把孩子节点挂载到父节点下面
   * @param children 孩子节点
   * @param el 父节点
   */
  const mountChildren = (children: VNodeProps[], el: HTMLElement) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], el)
    }
  }

  /**
   * 新老children都是数组的情况进行diff 
   * @param prev old vnode
   * @param next new vnode
   * @param el container
   */
  const patchKeyedChildren = (prev: VNodeProps[], next: VNodeProps[], el: HTMLElement) => {
    let i = 0, e1 = prev.length - 1, e2 = next.length - 1

    // 第一种情况：头和头相同，移动头指针
    // abcd => abcdef 结束时 i = 4 e1 = 3 e2 = 5
    while (i <= e1 && i <= e2) {
      const c1 = prev[i]
      const c2 = next[i]
      if (isSameVNodeType(c1, c2)) {
        patch(c1, c2, el, null)
      } else {
        break // 有不一样的地方直接退出
      }
      i++
    }

    // 第二种情况：尾和尾相同，移动尾指针
    // abc => eabc 结束时 i = 0 e1 = -1 e2 = 0
    while (i <= e1 && i <= e2) {
      const c1 = prev[e1]
      const c2 = next[e2]
      if (isSameVNodeType(c1, c2)) {
        patch(c1, c2, el, null)
      } else {
        break // 有不一样的地方直接退出
      }
      e1--
      e2--
    }

    // 处理比对结果
    // 新增
    // abc => abcd 结束时 i = 3 e1 = 2 e2 = 3
    // abc => dabc 结束时 i = 0 e1 = -1 e2 = 0
    if (i > e1) { // i > e1代表新增
      if (i <= e2) { // 哪些属于新增的范围 从i到e2
        const nextPosition = e2 + 1; // 找出e2的下一个位置，如果前面相同，那么下一个位置就数组越界，大于数组长度，如果后面相同，那么下一个位置就是小于数组长度
        // 需要找到新增的锚点,是在前面新增还是在后面新增
        const anchor = nextPosition < next.length ? next[nextPosition].el : null
        while(i <= e2) {
          patch(null, next[i], el, anchor) // 创建新增的元素
          i++
        }
      }
      // 删除
      // abcde => abc 从后面删除结束时 i = 3 e1 = 4 e2 = 2
      // dfabc => abc 从前面删除结束时 i = 0 e1 = 1 e2 = -1
    } else if (i > e2) { // i > e2代表删除
      while(i <= e1) { // 删除的区间范围
        hostRemove(prev[i].el as HTMLElement)
        i++
      }
    } else {
      // ab [cde] fg    i = 2   e1 = 5
      // ab [edch] xy   i = 2   e2 = 5
      let s1 = i, s2 = i
      // 创建新children发生变化区间的 key - index 映射关系
      const keyToNewIndexMap = new Map()
      for (let j = s2; j <= e2; j++) {
        const newChild = next[j]
        keyToNewIndexMap.set(newChild.key, j)
      }
      // keyToNewIndexMap :  {"E" => 2, "D" => 3, "C" => 4, "H" => 5}

      const toBePatched = e2 - s2 + 1
      // 用数组记录新的children的变化情况，0代表新增，非0代表存在进行patch即可
      const newIndexToOldMapIndex = new Array(toBePatched).fill(0)

      // 遍历老的发生变化的children，相同key的diff，但是位置不正确
      for (let k = s1; k <= e1; k++) {
        const old = prev[k]
        const newIndex = keyToNewIndexMap.get(old.key) // 老child在新children里面的索引
        if (newIndex === undefined) { // 如果老的在新的里面不存在，那么直接删除
          hostRemove(old.el as HTMLElement)
        } else {
          // 如果存在，那么更新toBePatch的状态，避免和0冲突，所以加1,并且进行patch打补丁
          newIndexToOldMapIndex[newIndex - s2] = k + 1 // 更新新元素在老集合中的位置
          patch(old, next[newIndex], el) // 打补丁
        }
      }
      // newIndexToOldMapIndex : [5, 4, 3, 0]

      const increasingSequenceIndex = getSequence(newIndexToOldMapIndex)
      let k = increasingSequenceIndex.length - 1
      // 处理新的children发生变化的部分,倒序插入
      for (let l = toBePatched - 1; l >= 0; l--) {
        const newIndex = s2 + l // 开始索引加上偏移量
        const nextChild = next[newIndex]
        // 插入的锚点
        const anchor = newIndex + 1 < next.length ? next[newIndex + 1].el : null
        if (newIndexToOldMapIndex[l] === 0) { // 表示新增的元素，那么直接新增
          patch(null, nextChild, el, anchor)
        } else {
          // 如果当前不存在递增子序列或者当前循环的l不等于递增子序列的最后一个，那么就新建，否则跳过
          if (k < 0 || l !== increasingSequenceIndex[k]) {
            hostInsert(nextChild.el as HTMLElement, el, anchor)
          } else {
            k--
          }
        }
      }
    }
  }

  /**
   * 给dom元素新老属性打补丁
   * @param oldProps 老属性
   * @param newProps 新属性
   * @param el 真实dom元素
   */
  const patchProps = (oldProps: object, newProps: object, el: HTMLElement) => {
    if (newProps !== oldProps) { // 新老相同就不处理了
      for (const key in newProps) {
        const prev = (oldProps as any)[key]
        const next = (newProps as any)[key]
        if (next !== prev) { // 相同就不用处理了
          hostPatchProps(el, key, prev, next)
        }
      }
      for (const k in oldProps) {
        if (!Reflect.ownKeys(newProps).includes(k)) { // 如果老的有心得没有，那就删掉
          hostPatchProps(el, k, (oldProps as any)[k], null)
        }
      }
    }
  }

  /**
   * 比较两个元素的儿子
   * @param prev old vnode
   * @param next new vnode
   * @param el dom container
   */
  const patchChildren = (prev: VNodeProps, next: VNodeProps, el: HTMLElement) => {
    const oldChildren = prev.children
    const newChildren = next.children
    // 如果新的孩子是文本，不管之前是什么直接替换
    if (next.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (newChildren !== oldChildren) {
        hostSetElementText(el, newChildren as string)
      }
    } else if (next.shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 如果新的儿子是数组
      if (prev.shapeFlag & ShapeFlags.TEXT_CHILDREN) { // 如果老的是文本，那只删除再创建新儿子
        hostSetElementText(el, '')
        mountChildren(newChildren as VNodeProps[], el)
      } else { // 如果新老都是数组，那么就进行diff算法
        // 两种强转方式
        patchKeyedChildren(oldChildren as VNodeProps[], <VNodeProps[]>newChildren, el)
      }
    }
  }
  /**
   * 把vnode挂载到dom中
   * @param vnode 虚拟节点
   * @param container 真实dom
   */
  const mountElement = (vnode: VNodeProps, container: HTMLElement, anchor: HTMLElement |null = null) => {
    const { shapeFlag, children, props, type } = vnode
    // 创建真实元素
    const el = vnode.el = hostCreateElement(type)
    if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 如果孩子是数组，那么循环创建
      mountChildren(children as VNodeProps[], el)
    } else { // 如果是文本节点，直接创建
      hostSetElementText(el, children as string)
    }
    // 处理props
    if (props) {
      for (const key in props) {
        hostPatchProps(el, key, null, (props as any)[key])
      }
    }
    hostInsert(el, container, anchor)
  }

  /**
   * 给元素类型打补丁
   * @param prev old vnode
   * @param next new vnode
   * @param el dom container
   */
  const patchElement = (prev: VNodeProps, next: VNodeProps, container: HTMLElement) => {
    const el = next.el = prev.el as HTMLElement // 因为类型相同，所以复用之前的dom
    // 如果类型一样，那么就给props打补丁
    const oldProps = prev.props || {}
    const nextProps = next.props || {}
    patchProps(oldProps, nextProps, el)
    patchChildren(prev, next, el)
  }

  /**
   * 创建组件的render effect
   * @param instance component instance
   * @param el dom container
   */
  function setupRenderEffect(instance: ComponentProps, el: HTMLElement) {
    // 每个组件对应一个effect
    effect(() => {
      if (!instance.isMounted && instance.render) { // 第一次挂载
        const subTree = instance.subTree = instance.render()
        patch(null, subTree , el)
        instance.isMounted = true
      } else { // 组件更新
        if (!instance.render) return
        const prev = instance.subTree // 之前的vnode
        const next = instance.render() // 现在最新的vnode
        patch(prev, next, el) // 打补丁
      }
    })
  }
  
  /**
   * 把虚拟节点挂载到真实dom上
   * @param vnode 虚拟节点
   * @param el 真实dom
   */
  const mountComponent = (vnode: VNodeProps, el: HTMLElement) => {
    // 每个组件都有对应的effect对应，相当于vue2里面的渲染watcher，达到组件级别的更新
    const instance = vnode.component = createComponentInstance(vnode)
    // 提取render方法
    setupComponent(instance)
    // 渲染
    setupRenderEffect(instance, el)
  }

  const updateComponent = (prev: any, next: VNodeProps, el: HTMLElement) => {}
  /**
   * 把vnode渲染到真实dom上
   * @param vnode vnode
   * @param el root container
   */
  const render = (vnode: any, el: HTMLElement) => {
    patch(null, vnode, el)
  }
  return {
    createApp: createAppApi(render)
  }
}

// 获取最长递增非连续子序列的索引
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}