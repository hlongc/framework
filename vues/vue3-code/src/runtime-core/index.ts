import { createAppApi } from './apiCreateApp'
import type { VNodeProps } from './vnode'
import { ShapeFlags } from '../shared/shapeFlags'
import { createComponentInstance, setupComponent } from './component'
import type { ComponentProps } from './component'
import { effect } from '../reactivity'

export interface OptionsType {
  createElement: (type: any) => HTMLElement;
  insert: (child: HTMLElement, parent: HTMLElement, anchor: null | HTMLElement) => void;
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
   */
  const processElement = (prev: any, next: VNodeProps, el: HTMLElement, anchor: HTMLElement | null) => {
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
   */
  const patch = (prev: VNodeProps | null, next: VNodeProps, el: HTMLElement, anchor: HTMLElement | null) => {
    anchor = anchor || null
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
      patch(null, children[i], el, null)
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
      console.log('乱序比较')
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
  const mountElement = (vnode: VNodeProps, container: HTMLElement, anchor: HTMLElement |null) => {
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
        patch(null, subTree , el, null)
        instance.isMounted = true
      } else { // 组件更新
        if (!instance.render) return
        const prev = instance.subTree // 之前的vnode
        const next = instance.render() // 现在最新的vnode
        patch(prev, next, el, null) // 打补丁
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
    patch(null, vnode, el, null)
  }
  return {
    createApp: createAppApi(render)
  }
}