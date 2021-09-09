/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
  let left = 0, maxLen = 0
  const map = new Map() // 保存每个字符的索引位置
  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    // 如果之前已经存在过了，那么更新这个字符的位置，更新为后一位
    if (map.has(char) && map.get(char) >= left) {
        left = map.get(char) + 1
    }
    map.set(char, right) // 设置最新字符的位置
    // 尝试修改最大长度
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
};
// abcdecfecd

debugger
console.log(lengthOfLongestSubstring("bbbbb"))