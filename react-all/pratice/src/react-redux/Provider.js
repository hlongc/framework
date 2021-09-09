import ReduxContext from './redux-context'

export default function Provider(props) {
  return (
    <ReduxContext.Provider value={{ store: props.store }}>
      { props.children }
    </ReduxContext.Provider>
  )
}