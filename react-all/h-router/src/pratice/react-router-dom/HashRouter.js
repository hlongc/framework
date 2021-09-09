import { createHashRouter } from '../history'
import { Router } from '../react-router'

export default function HashRouter(props) {
  const history = createHashRouter()
  return (
    <Router history={history}>
      { props.children }
    </Router>
  )
}