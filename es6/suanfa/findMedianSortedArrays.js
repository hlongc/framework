/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length > nums2.length) {
      [nums1, nums2] = [nums2, nums1]
  }
  const m = nums1.length
  const n = nums2.length
  const length =  m + n
  let left = 0, right = m
  while(left <= right) {
      const part1Len = (left + right) >> 1
      const part2Len =  ((length + 1) >> 1) - part1Len
      // 分别处理四种边界情况
      const L1 = part1Len === 0 ? -Infinity : nums1[part1Len - 1]
      const L2 = part2Len === 0 ? -Infinity : nums2[part2Len - 1]
      const R1 = part2Len === m ? Infinity : nums1[part1Len]
      const R2 = part2Len === n ? Infinity : nums2[part2Len]

      if (L1 > R2) {
          right = part1Len - 1
      } else if (L2 > R1) {
          left = part1Len + 1
      } else {
          return length % 2 === 0 ? (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : Math.max(L1, L2)
      }
  }
};
debugger
console.log(findMedianSortedArrays([1, 2], [3, 4]))