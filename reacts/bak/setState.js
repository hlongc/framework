import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.add = this.add.bind(this)
  }
  add() {
    // this.setState(prevState => ({ count: prevState.count + 1 }), () => {
    //   console.log(this.state)
    // })
    // this.setState(prevState => ({ count: prevState.count + 2 }), () => {
    //   console.log(this.state)
    // })
    // this.setState(prevState => ({ count: prevState.count + 3 }), () => {
    //   console.log(this.state)
    // })
    setTimeout(() => { // setTimeout会立即更新，不会走批处理合并更新
      this.setState(prevState => ({ count: prevState.count + 1 }))
      this.setState(prevState => ({ count: prevState.count + 2 }))
      console.log(this.state.count)
    })
  }
  render() {
    return (
      <div>
        <p>{this.props.name}：{this.state.count}</p>
        <button onClick={this.add}>增加</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter name="hlc" />
  , document.getElementById('root')
);
