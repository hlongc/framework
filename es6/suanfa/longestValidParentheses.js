/**
 * @param {string} s
 * @return {number}
 */
//  var longestValidParentheses = function (s) {
//   const valid = Array(s.length).fill(0);
//   const stack = [];

//   for (let i = 0; i < s.length; i++) {
//       if (s[i] === '(') stack.push(i);

//       if (s[i] === ')' && stack.length > 0) {
//           // Mark the open and close indices as 1 in valid.
//           valid[i] = 1;
//           valid[stack.pop()] = 1;
//       }
//   }

//   // Find longest sequence of 1s.
//   let count = 0,
//       max = 0;
//   for (let v of valid) {
//       v && count++;
//       v || (count = 0);
//       count > max && (max = count);
//   }
//   return max;
// };

var longestValidParentheses = function(s) {
  const validate = Array(s.length).fill(0)
  const stack = []
  for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') stack.push(i)
      if (s[i] === ')' && stack.length) {
          validate[i] = 1
          validate[stack.pop()] = 1
      }
  }
  let count = 0, max = 0
  for (const k of validate) {
      k && (count++)
      k || (count = 0)
      count > max && (max = count)
  }
  return max
};

// const str = '()(()))())()'
debugger
console.log(longestValidParentheses(")()())"))

// 作者：suukii
// 链接：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/32zui-chang-you-xiao-gua-hao-hua-dong-ch-n5jd/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。