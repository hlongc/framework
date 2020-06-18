'use strict';
let a = 1
let b = 2
// 严格模式中arguments不允许被赋值，即使赋值也会失效
function test(c, d) {
  console.log(c, d)
  arguments[0] = 3
  arguments[1] = 4
  console.log(c, d)
}

test(a, b)
console.log(a, b)