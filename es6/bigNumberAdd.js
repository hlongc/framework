
function largeAdd(a, b) {
  let tmp = 0, res = ''
  a = a.split('')
  b = b.split('')
  while (a.length || b.length || tmp) {
    tmp += ~~a.pop() + ~~b.pop()
    res = (tmp % 10) + res
    tmp = tmp > 9
  }
  return res.replace(/^0+/g, '')
}

console.log(largeAdd('123456781', '0000087654321'))