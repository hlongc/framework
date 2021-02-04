import { createDom } from '../react-dom'

class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState }
    const newVnode = this.render()
    updateClassComponent(this, newVnode)
  }

  render() {
    throw new Error('该方法需要子类实现')
  }
}

function updateClassComponent(instance, vnode) {
  const oldDom = instance.dom
  const newDom = createDom(vnode)
  oldDom.parentNode.replaceChild(newDom, oldDom)
  instance.dom = newDom
}

export {
  Component
}

export default Component