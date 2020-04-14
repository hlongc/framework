import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './react-redux'
import { createStore, applyMiddlewares } from './redux'
// import store from './store'
import reducers from './reducer/reducers'
import Counter from './Counter'
import promise from './middlewares/promise'
import thunk from './middlewares/thunk'
import logger from './middlewares/logger'


const store = applyMiddlewares(promise, thunk, logger)(createStore)(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>, 
document.getElementById('root'))
