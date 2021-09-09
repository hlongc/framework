/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange = function(nums, target) {
  let left = 0, right = nums.length - 1
  while(left <= right) {
      const mid = ~~((left + right) / 2)
      const current = nums[mid]
      if (current === target) {
          let l = r = mid
          while(nums[l] === target || nums[r] === target) {
              if (nums[l] === target) l--
              if (nums[r] === target) r++
          }
          return [l + 1, r - 1]
      } else if (current < target) {
          left++
      } else {
          right--
      }
  }
  return [-1, -1]
};

console.log(searchRange([1, 4], 4))