import React from 'react'
import { render } from 'react-dom';

// react 17不在编译阶段依赖React这个包
// <div></div> jsx不会在转换为React.createElement()而是调用jsx的包

// react17里面对虚拟dom进行了Object.freeze()操作


function FunctionWelcome(props) {
  return (
    <div id="test" style={{ color: 'red', backgroundColor: 'yellow' }}>
      hello { props.name }
      <span className="span" style={{ color: 'blue' }}>world</span>
      { props.children }
    </div>
  )
}

class ClazzComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }

  handleClick = (e) => {
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    this.setState({ num: this.state.num + 1 })
    console.log(this.state.num)
    e.stopPropagation()
    e.persist()
    setTimeout(() => {
      console.log(e)
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
      this.setState({ num: this.state.num + 1 })
      console.log(this.state.num)
    }, 1000)
  }

  hanldeDivClick = () => {
    console.log('div click')
  }

  render() {
    return (
      <div onClick={ this.hanldeDivClick }>
        <p>{this.state.num}</p>
        <button onClick={ this.handleClick }>加</button>
        { this.props.name }
        { this.props.children }
      </div>
    )
  }
}

render((
  <ClazzComponent name="test">
    next one
  </ClazzComponent>
), document.getElementById('root'))
