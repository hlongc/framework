import { useState, useMemo, useEffect, useContext } from 'react'
import ReduxContext from './redux-context'
import { bindActionCreators } from '../redux'

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function(Component) {
    return function(props) {
      const { store } = useContext(ReduxContext)
      const [state, setState] = useState(() => mapStateToProps(store.getState()))
      // 订阅更新
      useEffect(() => {
        return store.subscribe(() => {
          setState(mapStateToProps(store.getState()))
        })
      }, [store])
      const methods = useMemo(() => {
        let ret
        if (typeof mapDispatchToProps === 'function') {
          ret = mapDispatchToProps(store.dispatch)
        } else if (typeof mapDispatchToProps === 'object' && mapDispatchToProps !== null) {
          ret = bindActionCreators(mapDispatchToProps, store.dispatch)
        } else {
          ret = { dispatch: store.dispatch }
        }
        return ret
      }, [store.dispatch])
      return <Component {...props} {...state} {...methods} />
    }
  }
}