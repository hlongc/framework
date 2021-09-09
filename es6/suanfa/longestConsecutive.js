/**
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
进阶：你可以设计并实现时间复杂度为 O(n) 的解决方案吗？
示例 1：
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-consecutive-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
//  var longestConsecutive = function(nums) {
//   if (nums.length === 0) {
//     return 0
//   }
//   // 先排序
//   nums.sort((a,b) => {
//     return a - b
//   })
//   // 再去重
//   nums = Array.from(new Set(nums))
//   // 最后判断统计
//   let maxLen = 1 // 记录连续最长序列
//   let nowLen = 1 // 记录当前连续序列
//   debugger
//   for (let i = 0; i < nums.length - 1; i++) {
//     if (nums[i + 1] - nums[i] === 1) {
//       nowLen++
//       if (i === nums.length - 2) { // 处理遍历到最后一位的情况（有可能最后一次是最长的序列）
//         maxLen = nowLen > maxLen ? nowLen : maxLen
//       }
//     } else { // 每次不连续的时候判断是否是最长，并初始化 nowLen
//       maxLen = nowLen > maxLen ? nowLen : maxLen
//       nowLen = 1
//     }
//   }
//   return maxLen
// };

var longestConsecutive = (nums) => {
  debugger
  let map = new Map()
  let max = 0
  for (const num of nums) { // 遍历nums数组
    if (!map.has(num)) { // 重复的数字不考察，跳过
      let preLen = map.get(num - 1) || 0  // 获取左邻居所在序列的长度 
      let nextLen = map.get(num + 1) || 0 // 获取右邻居所在序列的长度 
      let curLen = preLen + 1 + nextLen   // 新序列的长度
      map.set(num, curLen) // 将自己存入 map
      max = Math.max(max, curLen) // 和 max 比较，试图刷新max
      map.set(num - preLen, curLen)  // 更新新序列的左端数字的value
      map.set(num + nextLen, curLen) // 更新新序列的右端数字的value
    }
  }
  return max
}


console.log(longestConsecutive([4, 2, 3, 0, 1]))