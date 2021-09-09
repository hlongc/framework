import Context from './context'
import { useContext, useState, useMemo, useEffect } from 'react'
import { bindActionCreators } from '../redux'

export default function connect(dispatchStateToProps, dispatchActionToProps) {
  return function(OldComponent) {
    return function(props) {
      const { store } = useContext(Context)
      const [state, setState] = useState(() => dispatchStateToProps(store.getState()))
      useEffect(() => {
        return store.subscribe(() => {
          setState(() => dispatchStateToProps(store.getState()))
        })
      }, [store])
      const bound = useMemo(() => {
        if (typeof dispatchActionToProps === 'object') {
          return bindActionCreators(dispatchActionToProps, store.dispatch)
        } else if (typeof dispatchActionToProps === 'function') {
          return dispatchActionToProps(store.dispatch)
        } else {
          return { dispatch: store.dispatch }
        }
      }, [store])
      
      return <OldComponent { ...props } {...state} {...bound} />
    }
  }
}
