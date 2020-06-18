const find = str => {
  const res = []
  const match = s => {
    const j = s.match(/^(0+|1+)/)[0] // 匹配出尽可能多的连续的1或者0
    const k = (j[0] ^ 1).toString().repeat(j.length) // 上一步找出的是0，这一步就是相同长度的1，反之是0
    const reg = new RegExp(`^${j}${k}`) // 匹配是否存在这样连续相同数量的01或者10
    return reg.test(s) ? j + k : ''
  }
  for (let i = 0; i < str.length - 1; i++) {
    const r = match(str.slice(i))
    if (r) {
      res.push(r)
    }
  }
  return res
}

const result = find('00110111001001')
console.log(result)