
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function(s) {
  let ret = '', tmp = '', i = 0, length = s.length
  while(i < length) {
      if (s[i] !== ' ') {
          tmp = s[i] + tmp
      } else {
          ret = ret + ' ' + tmp
          tmp = ''
      }
      i++
  }
  return ret
};

console.log(reverseWords("Let's take LeetCode contest"))