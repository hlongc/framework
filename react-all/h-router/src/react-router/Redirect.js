import LifeCycle from './LifeCycle'
import RouterContext from './RouterContext'

const Redirect = props => {
  return (
    <RouterContext.Consumer>
      {
        ({ history }) => {
          return <LifeCycle onMount={() => history.push(props.to)} />
        }
      }
    </RouterContext.Consumer>
  )
}

export default Redirect