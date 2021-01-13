export interface NodeOpsProps {
  createElement: (type: any) => HTMLElement;
  insert: (child: HTMLElement, parent: HTMLElement, anchor?: null | HTMLElement) => void;
  remove: (child: HTMLElement) => void;
  setElementText: (child: HTMLElement, text: string) => void;
  createTextElement: (content: string) => Text;
}

export const nodeOps: NodeOpsProps = {
  /**
   * 根据类型创建对应的元素
   * @param type 元素类型 div、p、span...
   */
  createElement(type: any) {
    return document.createElement(type)
  },
  /**
   * 在父节点中插入子元素
   * @param child 子元素
   * @param parent 父节点
   * @param anchor 插入的锚点 
   */
  insert(child: HTMLElement, parent: HTMLElement, anchor = null) {
    parent.insertBefore(child, anchor)
  },
  /**
   * 从父节点中移除该子节点
   * @param child 子节点
   */
  remove(child: HTMLElement) {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  /**
   * 给元素设置文本内容
   * @param child HTML元素
   * @param text 文本内容
   */
  setElementText(el: HTMLElement, text: string) {
    el.textContent = text
  },
  /**
   * 创建文本节点
   * @param content 文本内容
   */
  createTextElement(content: string) {
    return document.createTextNode(content)
  }
}