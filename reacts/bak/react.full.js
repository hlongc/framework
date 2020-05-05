import React, { Component, createRef, createContext, useContext } from './react';
import ReactDOM from './react-dom';

// function Wecome(props) {
//   function parentClick(e) {
//     console.log('父组件', e)
//   }
//   function childClick(e) {
//     e.persist()
//     setInterval(() => {
//       console.log('子组件', e)
//     }, 2000)
//   }
//   return <div id={props.id} style={props.style} onClick={parentClick}>
//     函数式组件
//     <span style={{ float: 'right' }} onClick={childClick}>welcome to china</span>
//   </div>
// }

// function FunctionComponent(props) {
//   return <button a={props.count} onClick={props.handleClick}>{props.count}</button>
// }

// class ClassComponent extends Component {
//   render() {
//     return <button a={this.props.count} onClick={this.props.handleClick}>{this.props.count}</button>
//   }
// }

const ColorContext = createContext()

function GrandSon() {
  const context = useContext(ColorContext)
  return (
    <div>
      <button onClick={() => context.changeColor('green')}>变绿</button>
      <button onClick={() => context.changeColor('red')}>变红</button>
    </div>
  )
}

class Child extends Component {
  static contextType = ColorContext
  state = {
    name: 'xixi'
  }
  // componentWillMount() {
  //   console.log('Child componentWillMount')
  // }
  componentDidMount() {
    console.log('Child componentDidMount')
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('Child componentWillReceiveProps')
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Child getDerivedStateFromProps')
    return { nickname: prevState.name + nextProps.count }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Child shouldComponentUpdate')
    return nextProps.count > 2
  }
  // componentWillUpdate() {
  //   console.log('Child componentWillUpdate')
  // }
  getSnapshotBeforeUpdate() {
    console.log('Child getSnapshotBeforeUpdate')
    return 'getSnapshotBeforeUpdate的返回值'
  }
  componentDidUpdate(prevProps, prevState, extra) {
    console.log('Child componentDidUpdate', extra)
  }
  componentWillUnmount() {
    console.log('Child componentWillUnmount')
  }
  render() {
    console.log('Child render', this.state, this.context)
    return (
      <div>
        { Math.random() > 0.5 ? this.context.color : null }
        <div>{this.props.count}</div>
        <GrandSon />
      </div>
    )
  }
}

class Welcome extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      color: 'red'
    }
    this.btn = createRef()
    console.log('Welcome constructor')
  }
  componentWillMount() {
    console.log('Welcome componentWillMount')
  }
  componentDidMount() {
    console.log('Welcome componentDidMount')
    this.setState({ count: this.state.count - 1 })
    console.log(this.state.count)
    this.setState({ count: this.state.count - 1 })
    console.log(this.state.count)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Welcome shouldComponentUpdate')
    return nextState.count > 1
  }
  componentWillUpdate() {
    console.log('Welcome componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('Welcome componentDidUpdate')
  }
  changeColor = (color) => {
    console.log(color)
    this.setState({ color })
  }
  handleClick = e => {
    console.log(this.btn.current)
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  render() {
    console.log('Welcome render', this.state)
    const value = {
      color: this.state.color,
      changeColor: this.changeColor
    }
    return (
      <ColorContext.Provider value={value}>
        <div style={{ color: this.state.color }}>
          { this.state.count }
          { this.state.count > 4 ? null : <Child count={this.state.count} /> }
          <button ref={this.btn} onClick={this.handleClick}>+</button>
          <p>
            { [<span>{this.state.count}--嘻嘻</span>, <span>{this.state.count}--哈哈</span>] }
          </p>
        </div>
      </ColorContext.Provider>
    )
  }
}

// const element = React.createElement('div', { id: 'container', style: { color: 'red' } }, React.createElement('span', { id: 'box1', style: { color: 'deepskyblue' } }, 'hello'), React.createElement('span', { id: 'box2', className: 'container' }, 'world'))

const element = React.createElement(Welcome, { id: 'weblcomeClass', style: { color: 'red', backgroundColor: 'green' } })

ReactDOM.render(
  element
  , document.getElementById('root')
);
 