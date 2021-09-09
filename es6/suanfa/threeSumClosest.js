/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
  nums.sort((a, b) => a - b)
  let diff = +Infinity, ret = nums[0]
  for (let i = 0; i < nums.length - 2; i++) {
      if (nums[i] > diff) continue
      if (nums[i] === nums[i + 1]) continue
      let left = i + 1, right = nums.length - 1, sum
      while(left < right) {
          sum = nums[left] + nums[right] + nums[i]
          if (Math.abs(sum - target) <= diff) {
              diff = Math.abs(sum - target)
              ret = sum
          }
          if (sum - target >= 0) {
              right--
          } else {
              left++
          }
      }
  }
  return ret
};

debugger
console.log(threeSumClosest([0, 0, 0], 1))