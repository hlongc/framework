import { useState, useEffect } from 'react'
import RouterContext from './RouterContext'

function Router(props) {
  const { history } = props
  const [location, setLocation] = useState(history.location)
  useEffect(() => {
    // 当location发生变化时更新当前的状态
    return history.listen(() => {
      setLocation(history.location)
    })
  }, [history])
  const value = {
    history,
    location,
    match: Router.computeMatch(location.pathname)
  }
  return (
    <RouterContext.Provider value={value}>
      { props.children }
    </RouterContext.Provider>
  )
}

Router.computeMatch = path => {
  return { url: '/', path, isExact: path === '/', params: {} }
}

export default Router