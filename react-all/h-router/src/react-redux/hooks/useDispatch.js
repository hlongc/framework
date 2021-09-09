import { useContext } from 'react'
import Context from '../Context'

export default function useDispatch() {
  const { store } = useContext(Context)
  return store.dispatch
}