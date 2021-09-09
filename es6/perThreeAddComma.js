const num = 123456789012

console.log(num.toLocaleString())

function handle(num) {
  num += ''
  let ret = ''
  while (num.length > 3) {
    ret = ',' + num.slice(-3) + ret
    num = num.slice(0, num.length - 3)
  }
  return num + ret
}

console.log(handle(num))