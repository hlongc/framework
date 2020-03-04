import { useContext } from 'react'
import RouterContext from './RouterContext'


export default function Prompt(props) {
  const { when, message } = props
  const context = useContext(RouterContext)
  if (when) {
    context.history.block(message)
  } else {
    context.history.unblock()
  }
  return null
}