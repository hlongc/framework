export function createContext() {
  function Provider(props) {
    Provider._value = props.value
    return props.children
  }
  function Consumer(props) {
    return props.children(Provider._value)
  }
  return { Provider, Consumer }
}

export function useContext(createContext) {
  return createContext.Provider._value
}