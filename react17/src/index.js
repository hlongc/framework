import React, { createContext, Component } from './react'
import { render } from './react-dom';

function getStyle(color) {
  return { border: `5px solid ${color}`, padding: '5px', margin: '5px' }
}

const ThemeContext = createContext()
class Person extends Component {
  constructor(props) {
    super(props)
    this.state = { color: 'red' }
  }

  changeColor = color => this.setState({ color })

  render() {
    const value = { color: this.state.color, changeColor: this.changeColor }
    return (
      <ThemeContext.Provider value={value}>
        <div style={{...getStyle(this.state.color), width: 200}}>
          人
          <Head />
          <Body />
        </div>
      </ThemeContext.Provider>
    )  
  }
}

 
function Head() {
  return (
    <ThemeContext.Consumer>
      {
        context => (
          <div style={getStyle(context.color)}>
            头
          </div>
        )
      }
    </ThemeContext.Consumer>
  )
}

class Body extends Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={getStyle(this.context.color)}>
        身体
        <p>
          <button onClick={() => this.context.changeColor('red')}>变红</button>
          <button onClick={() => this.context.changeColor('green')}>变绿</button>
        </p>
      </div>
    )
  }
}

render(<Person />, document.getElementById('root'))