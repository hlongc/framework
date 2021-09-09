import { createStore, applyMiddleware } from './redux'
import reducer from './reducer'

function logger({ getState }) {
  return function(next) {
    return function(action) {
      console.log('prev', getState())
      next(action)
      console.log('current', getState())
    }
  }
}

const store = applyMiddleware(logger)(createStore)(reducer)

export default store
