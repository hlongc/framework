/**
 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
注意:
假设字符串的长度不会超过 1010。
示例 1:
输入:
"abccccdd"
输出:
7
解释:
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 */

// 就像玩扑克牌一样，每次抽一张牌，如果手里的牌能和这张牌凑成一对就打出去，如果不能就放手里
function longestPalindrome(str) {
  const set = new Set()
  const list = str.split('')
  let length = 0
  for (const item of list) {
    if (set.has(item)) {
      set.delete(item)
      length += 2
    } else {
      set.add(item)
    }
  }
  return length + (set.size > 0 ? 1 : 1)
}

console.log(longestPalindrome('abccccdd'))