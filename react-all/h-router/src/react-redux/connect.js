import { useState, useContext, useEffect, useMemo } from 'react'
import Context from './Context'
import { bindActionCreators } from '../redux'

export default function connect(dispatchStateToProps, dispatchActionsToProps) {
  return function(Component) {
    return function(props) {
      const { store } = useContext(Context)
      const [state, setState] = useState(() => dispatchStateToProps(store.getState()))
      useEffect(() => {
        return store.subscribe(() => {
          setState(dispatchStateToProps(store.getState()))
        })
      }, [store])
      const boundActions = useMemo(() => {
        let o
        if (typeof dispatchActionsToProps === 'object') {
          o = bindActionCreators(dispatchActionsToProps, store.dispatch)
        } else if (typeof dispatchActionsToProps === 'function') {
          o = dispatchActionsToProps(store.dispatch)
        } else {
          o = { dispatch: store.dispatch }
        }
        return o
      }, [store])
      return <Component {...props} {...state} {...boundActions} />
    }
  }
}