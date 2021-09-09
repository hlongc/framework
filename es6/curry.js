function add() {
  const ret = []
  const sum = () => ret.reduce((memo, cur) => memo +cur, 0)
  if (arguments.length === 0) {
    return sum()
  } else {
    ret.push(...arguments)
    return function inner() {
      if (arguments.length === 0) {
        return sum()
      } else {
        ret.push(...arguments)
        return inner
      }
    }
  }
}

console.log(add(1, 2, 3)(4, 5)(6)())