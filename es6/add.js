function add() {
  function originAdd(...args) {
    return args.reduce((total, cur) => {
      return total + cur
    }, 0)
  }
  const all = []
  all.push(...arguments)
  if (all.length === 5) {
    return originAdd(...all)
  }
  return function inner() {
    all.push(...arguments)
    return all.length === 5 ? originAdd(...all) : inner
  }
}

console.log(add(1, 2, 3, 4, 5))
console.log(add(1)(2)(3)(4)(5))
console.log(add(1, 2, 3)(4)()(5))