import Route from './Route'

export default function withRouter(Component) {
  return props => {
    return (
      <Route children={
        routeProps => {
          return <Component {...props} {...routeProps} />
        }
      } />
    )
  }
}