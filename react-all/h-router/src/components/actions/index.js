export const ADD1 = 'ADD1'
export const MINUS1 = 'MINUS1'
export const ADD2 = 'ADD2'
export const MINUS2 = 'MINUS2'
export const ADD = 'ADD'

export const add1 = () => {
  return { type: ADD1 }
}

export const minus1 = () => {
  return { type: MINUS1 }
}

export const add2 = () => {
  // return { type: ADD2 }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ type: ADD2 })
    }, 3000)
  })
}

export const minus2 = () => {
  return function({dispatch}) {
    dispatch({ type: MINUS2 })
  }
}

export const add = () => {
  return { type: ADD }
}