import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'

const reducers = combineReducers({
  user
})

let devtool: any = () => {}
if (process.env.NODE_ENV === 'development') {
  devtool = composeWithDevTools
}


export default createStore(reducers, devtool())


