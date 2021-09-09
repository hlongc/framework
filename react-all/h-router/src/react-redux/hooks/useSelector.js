import { useContext, useEffect, useReducer } from 'react'
import Context from '../Context'

export default function useSelector(fn) {
  const { store } = useContext(Context)
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    return store.subscribe(forceUpdate)
  }, [store])
  return fn(store.getState())
}