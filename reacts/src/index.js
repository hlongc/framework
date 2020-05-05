import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log(this.state.count)
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log(this.state.count)
    setTimeout(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }))
      console.log(this.state.count)
      this.setState(prevState => ({ count: prevState.count + 1 }))
      console.log(this.state.count)
      // this.setState(prevState => ({ count: prevState.count + 1 }))
      // console.log(this.state.count)
      // this.setState(prevState => ({ count: prevState.count + 1 }))
      // console.log(this.state.count)
    })
  }
  render() {
    return NaN
  }
}
// debugger
ReactDOM.render(<Counter />, document.getElementById('root'))