import RouterContext from './RouterContext'

export default function Link(props) {
  return (
    <RouterContext.Consumer>
      {
        routerProps => {
          return <a {...props} href={props.to} onClick={e => {
            e.preventDefault()
            routerProps.history.push(props.to)
          }}>{props.children}</a>
        }
      }
    </RouterContext.Consumer>
  )
}