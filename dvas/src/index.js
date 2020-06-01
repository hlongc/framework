import React from 'react'
import dva, { connect } from 'dva'
import { Router, Route, Link } from 'dva/router'

const app = dva()

console.log(app)

const sleep = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, ms)
})

app.model({
  namespace: 'counter1',
  state: {
    counter: 0
  },
  // 同步修改状态
  reducers: {
    add(state) {
      return { counter: state.counter + 1 }
    },
    minus(state) {
      return { counter: state.counter - 1 }
    }
  },
  // 异步操作
  effects: {
    * asyncAdd(action, { call, put }) {
      yield call(sleep, 2000)
      yield put({ type: 'add' })
    }
  },
  subscriptions: {
    // { history, dispatch }
    change({ history }) {
      history.listen(location => {
        document.title = location.pathname
      })
    }
  }
})

app.model({
  namespace: 'counter2',
  state: {
    counter: 0
  },
  reducers: {
    add(state) {
      return { counter: state.counter + 1 }
    },
    minus(state) {
      return { counter: state.counter - 1 }
    }
  }
})

function Counter1(props) {
  return (
    <div>
      <p>{props.counter}</p>
      <button onClick={() => props.dispatch({ type: 'counter1/add' })}>add</button>
      <button onClick={() => props.dispatch({ type: 'counter1/asyncAdd' })}>asyncAdd</button>
      <button onClick={() => props.dispatch({ type: 'counter1/minus' })}>minus</button>
    </div>
  )
}

Counter1 = connect(state => state.counter1)(Counter1)

function Counter2(props) {
  return (
    <div>
      <p>{props.counter}</p>
      <button onClick={() => props.dispatch({ type: 'counter2/add' })}>add</button>
      <button onClick={() => props.dispatch({ type: 'counter2/minus' })}>minus</button>
    </div>
  )
}

Counter2 = connect(state => state.counter2)(Counter2)

app.router(({ history }) => (
  <Router history={history}>
    <>
      <Link to='/count1'>count1</Link>
      <Link to='/count2'>count2</Link>
      <hr />
      <Route path='/count1' component={Counter1} />
      <Route path='/count2' component={Counter2} />
    </>
  </Router>
))

app.start('#root')