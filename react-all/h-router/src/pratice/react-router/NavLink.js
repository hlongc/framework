import Route from './Route'
import Link from './Link'

export default function NavLink(props) {
  const { exact = false, to, className = '', style = {}, activeClassName = '', activeStyle = {}, children } = props
  return (
    <Route
      exact={exact}
      path={to}
      children={
        routerProps => {
          const match = routerProps.match
          const styl = match ? { ...style, ...activeStyle } : style
          const clazz = match ? className + ' ' + activeClassName : className
          return <Link to={to} className={clazz} style={styl}>{children}</Link>
        }
      }
    />
  )
}