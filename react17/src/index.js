import React from './react'
import { render } from './react-dom';

// react 17不在编译阶段依赖React这个包
// <div></div> jsx不会在转换为React.createElement()而是调用jsx的包

// react17里面对虚拟dom进行了Object.freeze()操作

function FunctionComponent(props) {
  return (
    <div id="function-component">FunctionComponent: { props.count }</div>
  )
}

class Human extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      large: ''
    }
    this.button = React.createRef()
    console.log(this.button)
  }
  componentDidMount() {
    console.log(this.button.current)
    console.log('Human componentDidMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Human shouldComponentUpdate', nextProps, nextState, this.props, this.state)
    return nextProps.age % 2 === 0
  }
  modifyLarge = () => {
    this.setState({ large: '我是setState' })
  }
  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('Human componentWillReceiveProps', nextProps, nextState, this.props, this.state)
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Human getSnapshotBeforeUpdate')
    return 123
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Human getDerivedStateFromProps', nextProps, prevState)
    return { large: nextProps.age + 1 }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot)
    console.log('Human componentDidUpdate', this.props, this.state)
  }
  update = () => {
    this.forceUpdate()
  }
  render() {
    console.log('Human render')
    return (
      <div>
        Human { this.props.age }
        <p>large { this.state.large }</p>
        <button ref={this.button} onClick={this.modifyLarge}>修改large</button>
        <button onClick={this.update}>forceUpdate</button>
      </div>
    )
  }
}

class Counter extends React.Component {
  static defaultProps = {
    name: 'hlc'
  }
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }
  componentWillMount() {
    // console.log('componentWillMount')
  }
  componentDidMount() {
    // console.log('componentDidMount')
  }
  handleClick = () => {
    // debugger
    this.setState({ num: this.state.num + 1 })
  }
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps', nextProps, nextState, this.props, this.state)
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const ret = nextState.num % 2 === 0
  //   console.log(`shouldComponentUpdate: ${ret}`, nextProps, nextState, this.props, this.state)
  //   return ret
  // }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate', nextProps, nextState, this.props, this.state)
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate', this.props, this.state)
  }
  render() {
    console.log('parent render', this.state.num)
    return (
      <div id={`counter${this.state.num}`}>
        { this.state.num }
        {/* <p style={{ color: this.state.num % 4 === 0 ? 'red' : 'green' }}>我是p标签: { this.state.num }</p> */}
        {/* <p style={{ color: 'deepskyblue' }}>deepskyblue: { this.state.num % 3 === 0 ? this.state.num : null }</p> */}
        {/* { this.state.num % 5 === 0 ? <FunctionComponent count={this.state.num} /> : null } */}
        <Human age={this.state.num} />
        <button onClick={this.handleClick}>加</button>
      </div>
    )
  }
}

render(<Counter name="xixi" />, document.getElementById('root'))