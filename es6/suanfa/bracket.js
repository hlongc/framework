
function matchBracket(str) {
  const stack = []
  let i = 0
  while(i < str.length) {
    if (str[i] === '(') {
      stack.push(')')
    } else if (str[i] === '[') {
      stack.push(']')
    } else if (str[i] === '{') {
      stack.push('}')
    } else {
      if (str[i] !== stack.pop()) {
        return false
      }
    }
    i++
  }
  return stack.length === 0
}

console.log(matchBracket('{([({})])}'))
console.log(matchBracket('()[]{()}'))