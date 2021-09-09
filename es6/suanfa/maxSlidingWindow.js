/**
给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
示例:
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 */

var maxSlidingWindow = function(nums, k) {
  debugger
  let indexs = []  // 存放索引
  let res = []     // 存放最大值
  for(let i = 0; i < nums.length; i++){
    // 把窗口之外的去掉 indexs 出列 一个
    if(indexs[0] === i - k) indexs.shift()
    // 当前值 比 indexs 中对应的值 大, indexs 出栈 一个, 循环  保证 indexs[0] 对应的值 为最大值
    while(indexs.length > 0 && nums[i] > nums[indexs[indexs.length - 1]]) indexs.pop()
    // 加入当前索引
    indexs.push(i)
   // 当窗口大小到达 k 时, i每移动一下, 就产生一个最大值
    if(i >= k - 1) res.push(nums[indexs[0]])
  }
  return res
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 单调队列
//  var maxSlidingWindow = function(nums, k) {
//   if (!nums || !nums.length || k <= 0) return []
//   if (k === 1) return nums

//   let res = [], queue = []

//   for (let i = 0; i < nums.length; i++) {
    
//     if(i >= k) {
//       // 尾部元素出滑动窗口
//       let outElem = nums[i - k]
//       if (outElem === queue[0]) queue.shift()
      
//     }
//     // 当前元素进入滑动窗口
//     let inElem = nums[i]
//     while (queue.length && queue[queue.length - 1] < inElem) queue.pop()
//     queue.push(inElem)

//     if (i >= k - 1) res.push(queue[0])
//   }

//   return res
// };

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))