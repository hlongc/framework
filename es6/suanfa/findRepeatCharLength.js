
/**
 * 在一个乱序的数组中查找出重复字符串的最大长度区间，使用快慢指针
 * @param {number[]} arr
 * @returns {number} 
 */
function findRepeatCharLength(arr) {
  let [slow, maxLen, ret] = [0, 1, []]
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      if (fast - slow > maxLen) {
        maxLen = fast - slow
        ret = [slow, fast - 1]
      }
      slow = fast
    }
  }
  return arr.slice(ret[0], ret[1] + 1)
}

const list = [7, 1, 2, 3, 4, 4, 4, 4, 2, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 0]

console.log(findRepeatCharLength(list))