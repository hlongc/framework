import Context from './context'

export default function Provider(props) {
  return (
    <Context.Provider value={{ store: props.store }}>
      { props.children }
    </Context.Provider>
  )
}