const after = (time, fn) => {
  return () => {
    if (--time === 0) {
      fn()
    }
  }
}

const newAfter = after(3, () => {
  console.log('执行3次以后打印')
})

newAfter()
newAfter()
newAfter()
