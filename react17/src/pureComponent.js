import React, { Component, PureComponent } from './react'
import { render } from './react-dom';

class Parent extends Component {
  state = {
    number: 0,
    counter: 0
  }
  addNumber = () => {
    this.setState({ number: this.state.number + 1 })
  }
  addCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
  }
  render() {
    console.log('Parent render')
    return (
      <div>
        <Num number={this.state.number} />
        <Counter counter={this.state.counter} />
        <button onClick={this.addNumber}>number+</button>
        <button onClick={this.addCounter}>counter+</button>
      </div>
    )
  }
}

class Num extends PureComponent {
  render() {
    console.log('Num render')
    return <div>Number: {this.props.number}</div>
  }
}

class Counter extends PureComponent {
  render() {
    console.log('Counter render')
    return <div>Counter: {this.props.counter}</div>
  }
}

render(<Parent />, document.getElementById('root'))