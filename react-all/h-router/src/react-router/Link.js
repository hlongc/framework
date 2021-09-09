import RouterContext from './RouterContext'

const Link = props => {
  return (
    <RouterContext.Consumer>
      {
        value => {
          return (
            <a {...props} href={props.to} onClick={(event) => {
              event.preventDefault()
              value.history.push(props.to)
            }}>{props.children}</a>
          )
        }
      }
    </RouterContext.Consumer>
  )
}

export default Link