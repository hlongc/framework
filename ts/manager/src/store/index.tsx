import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginState from './loginState'

const reducers = combineReducers({
  loginState
})

let devtool: any = () => {}
if (process.env.NODE_ENV === 'development') {
  devtool = composeWithDevTools
}


export default createStore(reducers, devtool())


