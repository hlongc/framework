// import { combineReducers, createStore, applyMiddleware } from '../../redux'
import { combineReducers, createStore, applyMiddleware } from '../../pratice/redux'
import counter1 from './counter1'
import counter2 from './counter2'

const rootReducer = combineReducers({ counter1, counter2 })

function logger({ getState }) {
  return function(next) {
    return function log(action) {
      console.log('prev', getState())
      next(action)
      console.log('next', getState())
    }
  }
}

function promise({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action !== null && typeof action.then === 'function') {
        action.then(x => dispatch(x))
      } else {
        next(action)
      }
    }
  }
}

function thunk({ getState, dispatch }) {
  return function(next) {
    return function(action) {
      if (typeof action === 'function') {
        return action({ getState, dispatch })
      } else {
        return next(action)
      }
    }
  }
}

const store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer)

export default store