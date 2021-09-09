
// 求两个数的最大公约数
function getMaxCommonDivisor(a, b) {
  if (b === 0) return a
  a = a > b ? a : b
  return getMaxCommonDivisor(b, a % b)
}

// 求两个数的最小公倍数
function getMinCommonMultiple(a, b) {
  return a * b / getMaxCommonDivisor(a, b)
}

const ret = getMaxCommonDivisor(128, 96)
console.log(ret)

const r = getMinCommonMultiple(36, 24)
console.log(r)