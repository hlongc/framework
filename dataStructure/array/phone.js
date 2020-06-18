// 输出电话号码组合

const letterCombinations = digits => {
  const map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const code = digits.split('').map(item => map[item]).filter(item => !!item)
  const combine = arr => {
    if (arr.length === 1) {
      return arr[0].split('')
    }
    const result = []
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        result.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, result)
    if (arr.length > 1) {
      return combine(arr)
    } else {
      return arr[0]
    }
  }
  return combine(code)
}

const res = letterCombinations('12')
console.log(res)