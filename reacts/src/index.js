import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './react-redux'
import { createStore } from './redux'
// import store from './store'
import reducers from './reducer/reducers'
import Counter from './Counter'

function logger({ dispatch, getState }) {
  return function(next) { // next代表下一个中间件或者真正的store.dispatch
    return function(action) { // 增强以后的dispatch方法
      console.log('老状态', getState())
      next(action)
      console.log('新状态', getState())
    }
  }
}

function applyMiddlewares(middleware) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      let dispatch
      middleware = middleware({
        getState: store.getState,
        dispatch: action => dispatch(action)
      })
      dispatch = middleware(store.dispatch) // 传入真正的dispatch，只有第一个中间件才能收到真正的dispatch
      return { ...store, dispatch }
    }
  }
}

const store = applyMiddlewares(logger)(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>
  , document.getElementById('root'))
