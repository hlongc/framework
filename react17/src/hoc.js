import React, { Component, cloneElement } from './react'
import { render } from './react-dom';

// 1、属性代理
const withLoading = message => OriginComponent => {
  return class PropertyProxy extends Component {
    show = () => {
      const modal = document.createElement('div')
      modal.innerHTML = `
        <div id="modal" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;margin:auto; box-sizing: border-box; border: 1px solid #fff; background: rgba(0,0,0,0.3); color: #fff; width: 450px; height: 250px; text-align: center; line-height: 250px;">${message}</div>
      `
      document.body.appendChild(modal)
    }
    hide = () => {
      document.getElementById('modal').remove()
    }
    render() {
      const props = { hide: this.hide, show: this.show }
      return <OriginComponent {...this.props} {...props}/>
    }
  }
}
class Modal extends Component {
  render() {
    return (
      <div>
        测试高阶组件
        <p>
          <button onClick={this.props.show}>显示模态框</button>
          <button onClick={this.props.hide}>隐藏模态框</button>
        </p>
      </div>
    )
  }
}

const HOC = withLoading('loading...')(Modal)

// 2、反向继承
class Button extends Component {
  componentDidMount() {
    console.log('Button componentDidMount');
  }
  render() {
    return <button />
  }
}

const wrapper = OriginComponent => {
  return class ReverseInheritance extends OriginComponent {
    state = { num: 0 }
    componentDidMount() {
      console.log('ReverseInheritance componentDidMount')
      super.componentDidMount()
    }
    add = () => this.setState({ num: this.state.num + 1 })
    render() {
      const renderVDom = super.render()
      const cloneEle = cloneElement(renderVDom, {
        onClick: this.add
      }, this.state.num)
      return cloneEle
    }
  }
}

const WrapperButton = wrapper(Button)

render(<WrapperButton />, document.getElementById('root'))