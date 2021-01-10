import { createRenderer } from '../runtime-core'
import { nodeOps } from './nodeOps'
import { patchProps } from './patchProps'

function ensureRenderer() {
  return createRenderer({ patchProps, ...nodeOps })
}

export function createApp(rootComponent: any) {
  const app = ensureRenderer().createApp(rootComponent)
  const { mount } = app
  // 根据不同平台进行重写mount方法，和vue2行为一样
  app.mount = function(el: HTMLElement | string) {
    let container: HTMLElement
    if (typeof el === 'string') {
      container = document.querySelector(el) as HTMLElement
    } else {
      container = el
    }
    // 清空根元素的内容比如123  <div id="app">123</div>
    container.innerHTML = ''
    mount(container)
  }
  return app
}