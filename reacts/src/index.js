import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'
import useFirstRender from './selfHooks/useFirstRender'
import { FixedSizeList } from './utils/react-window'


function Home(props) {
  console.log(props)
  return <div>Home</div>
}

function Info(props) {
  return <div>Info</div>
}

function User(props) {
  return <div>User</div>
}

function App1() {
  return (
    <Router>
      <div>
        <Link to='/home'>home</Link>
        <Link to='/info'>info</Link>
        <Link to='/user'>user</Link>
      </div>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/info' component={Info} />
        <Route path='/user' component={User} />
        <Redirect to='/home' />
      </Switch>
    </Router>
  )
}



function Child() {
  const firstRender = useFirstRender()
  useEffect(() => {
    if (!firstRender) { // 如果不是第一次渲染，代表更新操作
      console.log('child update')
    } else {
      console.log('render')
    }
  })

  return (
    <div>我是子元素</div>
  )
}

function App2() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{ count }</p>
      <p>count 大于等于5 && 小于等于 10时隐藏子元素</p>
      <button onClick={() => setCount(count + 1)}>count+</button>
      { count < 5 || count > 10 ? <Child /> : null }
    </div>
  )
}

function getColor() {
  const rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16).toUpperCase()
  if (rand.length === 6) {
    return '#' + rand
  }else{
    return getColor()
  }
}

function Row({ index, style }) {
  const selfStyle = {
    backgroundColor: getColor(),
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff'
  }
  return <div key={index} style={{ ...style, ...selfStyle }}>嘻嘻嘻嘻</div>
}

function App3() {
  return (
    <FixedSizeList
      height={150}
      width='100%'
      itemCount={100}
      itemSize={30}
    >
      { Row }
    </FixedSizeList>
  )
}

class Two extends React.Component {
  state = {
    count: 1
  }
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('getDerivedStateFromProps')
    return null
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return this.props.number !== nextProps.number
  }
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
    return 1
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', snapshot)
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  render() {
    console.log('render')
    return (
      <div>
        <p>count: { this.state.count }</p>
        <button onClick={this.handleClick}>+</button>
        <p>props.number: {this.props.number}</p>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    number: 0
  }

  handleClick = () => {
    this.setState(prevState => ({ number: prevState.number + 1 }))
  }

  render() {
    return (
      <div>
        <p>state.number: {this.state.number}</p>
        <button onClick={this.handleClick}>+number</button>
        { this.state.number < 5 ? <Two number={this.state.number} /> : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))