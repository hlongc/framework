/**
给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

示例:
输入: [1,2,3,4]
输出: [24,12,8,6]
 
提示：题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。
说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/product-of-array-except-self
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var productExceptSelf = function(nums) {
  debugger
  const length = nums.length
  const output = [1]
  // 存放左边元素的乘积
  for (let i = 1; i < length; i++) {
      output[i] = output[i - 1] * nums[i - 1]
  }
  let right = 1
  for (let j = length - 1; j >= 0; j--) {
      output[j] = output[j] * right
      // 右边元素的乘积
      right = right * nums[j]
  }
  return output
};

productExceptSelf([1, 2, 3, 4])