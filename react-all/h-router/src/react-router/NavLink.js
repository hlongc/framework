import RouterContext from './RouterContext'
import Link from './Link'
import { matchUrl } from './match'

const NavLink = props => {
  return (
    <RouterContext.Consumer>
      {
        ({ location }) => {
          const { to, exact = false, className = '', activeClassName = '', style = {}, activeStyle = {} } = props
          const match = matchUrl({ path: to, pathname: location.pathname, exact })
          const clazz = match ? className + ' ' + activeClassName : className
          const styl = match ? { ...style, ...activeStyle } : style
          return (
            <Link {...{to}} className={clazz} style={styl}>{props.children}</Link>
          )
        }
      }
    </RouterContext.Consumer>
  )
}

export default NavLink