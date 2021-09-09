import RouterContext from './RouterContext'
import LifeCycle from './LifeCycle'

export default function Prompt({ when, message }) {
  if (!when) return null
  return (
    <RouterContext.Consumer>
      {
        ({ history }) => {
          return (
            <LifeCycle
              onMount={self => { self.release = history.block(message) }}
              onUnmount={self => self.release()}
            />
          )
        }
      }
    </RouterContext.Consumer>
  )
}