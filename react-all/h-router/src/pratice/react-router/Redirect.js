import RouterContext from './RouterContext'

export default function Redirect(props) {
  return (
    <RouterContext.Consumer>
      {
        routerProps => {
          routerProps.history.push(props.to)
        }
      }
    </RouterContext.Consumer>
  )
}

