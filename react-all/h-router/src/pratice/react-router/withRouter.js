import RouterContext from './RouterContext'

export default function withRouter(Component) {
  return function(props) {
    return (
      <RouterContext.Consumer>
        {
          routerProps => {
            return <Component {...props} {...routerProps} />
          }
        }
      </RouterContext.Consumer>
    )
  }
}