
// function calculate(num) {
//   if (num === 1) return '结束'
//   return calculate(num - 1)
// }

// calculate(100000)
// RangeError: Maximum call stack size exceeded
// 上述的递归会导致爆栈，因为一直在把calculate压入栈，超过了栈的最大值


// 改写成下面的蹦床函数，就不会出现爆栈，用时间换空间
function calculate(num) {
  if (num === 1) return '结束'
  return calculate.bind(null, num - 1)
}

function trampoline(fn) {
  let ret = fn
  while (typeof ret === 'function') {
    ret = ret()
  }
  console.log(ret)
}

trampoline(calculate(100000))