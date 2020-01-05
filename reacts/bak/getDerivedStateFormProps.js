import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
  constructor(props) {
    console.log('构造函数')
    super(props)
    this.state = { count: 0 }
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  add = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate: 返回true就是更新,false就不更新')
    return true
  }
  componentDidUpdate() {
    console.log('componentDidUpdate: 组件更新完毕')
  }
  // render只是返回虚拟dom 也就是React.createElement()的返回值
  render() {
    console.log('render')
    return (
      <div>
        <p>{ this.state.count }</p>
        <button onClick={ this.add }>增加</button>
        <hr />
        <Num count={this.state.count} />
      </div>
    )
  }
  componentDidMount() {
    console.log('组件渲染完成')
  }
}

class Num extends Component {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps)
  //   console.log('this.props', this.props)
  //   if (nextProps.count !== this.props.count)
  //   this.setState(prevState => ({ name: prevState.name + nextProps.count }))
  // }
  shouldComponentUpdate(nextProps, prevState) {
    console.log('子组件是否更新')
    console.log(nextProps, prevState)
    return true
  }
  // componentWillUpdate() {
  //   console.log('子组件componentWillUpdate')
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps')
    if (nextProps.count % 2 === 0) {
      return { num: nextProps.count * 2 + prevState.num }
    } else {
      return { num: nextProps.count * 3 - prevState.num }
    }
  }
  render() {
    console.log('子组件render')
    return <div>{ this.state.num }</div>
  }
  componentDidUpdate() {
    console.log('子组件componentDidUpdate')
  }
}

ReactDOM.render(
  <Counter />
  , document.getElementById('root')
);

