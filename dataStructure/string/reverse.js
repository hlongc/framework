const reverse = str => {
  // 匹配连续非空字符串
  return str.replace(/([^\s]+)/g, function() {
    return arguments[1].split('').reverse().join('')
  })
}
// 字符串反转
const res = reverse("abcd'e black borad  hhh   xixi hei")
console.log(res) // e'dcba kcalb darob  hhh   ixix ieh