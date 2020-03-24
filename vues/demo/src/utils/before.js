Function.prototype.before = function(beforeFn) {
  return (...args) => {
    beforeFn()
    this(...args)
  }
}

const say = (...args) => {
  console.log(`say: ${args}`)
}

const sayBefore = say.before(() => {
  console.log('说话之前请思考')
})

sayBefore(4, 5, 6)
