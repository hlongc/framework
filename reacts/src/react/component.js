export const updateQueue = {
  isPending: false, // false表示当前不是批量更新模式，true表示当前为批量更新模式
  updaters: [], // 全局更新队列，包含一个个待更新的updater实例
  add(updater) { // 向队列中新增updater
    this.updaters.push(updater)
  },
  batchUpdate() { // 批量更新
    if (this.isPending) return // 如果正在进行批量更新，那只能等此次更新完毕再更新了
    this.isPending = true
    let updater
    while (updater = this.updaters.pop()) { // 依次弹出updater进行更新
      updater.updateComponent()
    }
    this.isPending = false
  }
}

class Updater{
  constructor(componentInstance) {
    this.componentInstance = componentInstance // updater和类组件一一对应
    this.pendingState = [] // 当前组件未处理的state更新队列
    this.nextProps = null
  }

  addState(updater) {
    this.pendingState.push(updater) // 放到更新队列中
    this.emitUpdate() // 尝试进行更新
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps // 更新下次props的值
    // 如果当前props发生变化了，或者当前不是批量更新模式，那么立即进行更新
    if (this.nextProps || !updateQueue.isPending) {
      this.updateComponent()
    } else {
      updateQueue.add(this)
    }
  }
  updateComponent() {
    const { componentInstance, pendingState, nextProps } = this
    // 如果nextProps有值或者state更新队列长度大于0，那么进行更新
    if (nextProps || pendingState.length) {
      shouldUpdate(componentInstance, nextProps, this.getState())
    }
  }
  getState() {
    let { pendingState, nextProps, componentInstance: { state } } = this

    if (pendingState.length) {
      pendingState.forEach(nextState => {
        if (typeof nextState === 'function') { // 如果setState传入的是一个函数，那么执行它得到改变的结果
          nextState = nextState(state, nextProps)
        }
        state = { ...state, ...nextState }
      })
      pendingState.length = 0 // 清空state更新队列
    }
    return state
  }
}

function shouldUpdate(componentInstance, nextProps, nextState) {
  // 无论视图是否更新，数据都要更新
  componentInstance.props = nextProps
  componentInstance.state = nextState
  // 如果传入了componentShouldUpdate生命周期，并且返回值是假值的话，那么不会进行视图更新
  if (componentInstance.componentShouldUpdate && !componentInstance.componentShouldUpdate()) {
    return
  }
  componentInstance.forceUpdate()
}

function compareElement(oldVNode, newVNode) {
  if (newVNode === null) { // 新节点被删除了，则移除老节点
    oldVNode.dom.parentNode.removeChild(oldVNode.dom)
  } else if (newVNode.type !== newVNode.type) {
    
  }
}

class Component {
  constructor(props, context) {
    this.props = props
    this.context = context
    this.$updater = new Updater(this)
    this.nextProps = null
    this.state = {}
  }

  setState(partialState) {
    this.$updater.addState(partialState)
  }

  forceUpdate() {
    const { props, state, renderElement: oldRenderElement } = this
    if (this.componentWillUpdate) this.componentWillUpdate(props, state)
    const newRenderElement = this.render() // 重新render获取新的react元素
    const currentRenderElement = compareElement(oldRenderElement, newRenderElement)
    this.renderElement = currentRenderElement
    if (this.componentDidUpdate) this.componentDidUpdate(props, state)
  }
}
// isReactComponent用来标记当前是类组件
Component.prototype.isReactComponent = {}

class PureComponent extends Component{}
// 标记当前是纯类组件
PureComponent.prototype.isPureReactComponent = true

export {
  Component,
  PureComponent
}