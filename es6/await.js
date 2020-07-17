let a = 0
let b = async () => {
  const c = await 10;
  a = a + c;
  console.log('2', a) // -> '2' 11
}
b()
a++
console.log('1', a) // -> '1' 1
setTimeout(() => {
  console.log('setTimeout', a)
})