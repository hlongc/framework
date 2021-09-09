
var countSubstrings = function(s) {
  let count = 0
  const ret = []
  for (let i = 0, len = s.length; i < len; i++) {
    let str = '', rts = ''
    for (let j = i; j < len; j++) {
      str += s[j]
      rts = s[j] + rts
      if (str === rts) {
        count++
        ret.push(str)
      }
    }
  }
  console.log(ret)
  return count
};

console.log(countSubstrings('aaababc'))