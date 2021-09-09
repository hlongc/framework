/**
给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。
示例 1：
输入：s = "aacecaaa"
输出："aaacecaaa"
示例 2：
输入：s = "abcd"
输出："dcbabcd"
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shortest-palindrome
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

// var shortestPalindrome = function (s) {
//   const len = s.length
//   // 长度为0的话直接返回空字符串
//   if (len == 0) return ''
//   // rev 为s的反转字符串
//   let rev = s.split('').reduce((a, b) => b + a, '')
  
//   // 因为要构成回文串，第一个和最后一个字符要相同
//   // 在字符串前面添加的字符要与末尾的字符一一对应
//   // for循环中的i表示我们添加在原字符串前面字符的个数 
//   debugger
//   for (let i = 0; i < len; i++) {
//       // 判断字符串是不是回文字符串
//       // 因为我们在字符串前面添加的字符一定是和末尾的字符相对应的
//       // 所以只用判断s.slice(0, len - i)是不是回文字符串
//       // rev.slice(i)实际上就是s.slice(0, len - i)的反转字符串
//       if (s.slice(0, len - i) == rev.slice(i)) {
//           // 如果是回文字符串的话，这就是我们要求的最短回文串
//           // 直接将其返回，值是我们添加的字符加上原字符串rev.slice(0, i) + s
//           return rev.slice(0, i) + s
//       }
//   }
// };





function shortestPalindrome(str) {
  const length = str.length
  if (length <= 1) return str
  const reverseStr = str.split('').reverse().join('')
  for (let i = 0; i < length; i++) {
    // 去除头和尾，比较中间部分
    if (reverseStr.slice(i) === str.slice(0, length - i)) {
      return reverseStr.slice(0, i) + str
    }
  }
}


const ret = shortestPalindrome('aacecaaa')
console.log(ret)