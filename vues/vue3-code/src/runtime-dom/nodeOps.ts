import type { OptionsType } from '../runtime-core'

export const nodeOps: OptionsType = {
  createElement(type: any) {
    return document.createElement(type)
  },
  insert(child: HTMLElement, parent: HTMLElement, anchor = null) {
    parent.insertBefore(child, anchor)
  },
  remove(child: HTMLElement) {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  setElementText(child: HTMLElement, text: string) {
    child.textContent = text
  },
  createTextElement(content: string) {
    return document.createTextNode(content)
  }
}