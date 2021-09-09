import { useContext } from 'react'
import Context from '../Context'

export default function useStore() {
  return useContext(Context)
}