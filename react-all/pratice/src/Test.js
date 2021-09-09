import { Component } from 'react'

class Test extends Component {
  constructor() {
    super()
    this.state = { num: 1 }
    console.log('constructor')
  }
  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps')
    return null
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 1 })
  }
  render() {
    console.log('render')
    return (
      <div>
        { this.state.num }
        <p><button onClick={this.handleClick}>+</button></p>
      </div>
    )
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
    return null
  }
  componentDidUpdate() {
    console.log('componentDidUpdated')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
}

export default Test