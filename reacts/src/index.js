import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'


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

// 自定义hooks: 组件是否为更新渲染
function useFirstRender() {
  const firstRender = useRef(false)
  useEffect(() => {
    firstRender.current = true
  }, [])
  return firstRender.current
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

function App() {
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

ReactDOM.render(<App />, document.querySelector('#root'))