/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
  const ret = []
  let [left, right, a, b] = [0, nums.length - 1]
  while(left <= right) {
      a = Math.abs(nums[left])
      b = Math.abs(nums[right])
      if (a > b) {
          ret.unshift(a ** 2)
          left++
      } else {
          ret.unshift(b ** 2)
          right--
      }
  }
  return ret
};