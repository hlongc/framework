// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/3sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * 在arr中寻找三个和为0的所有集合
 * @param {number[]} arr
 * @returns {array[]}
 */
function threeSum(arr) {
  const ret = [];
  arr.sort((a, b) => a - b); // 从小到大排序，使用双指针缩小区间
  const length = arr.length
  for (let i = 0; i < length - 2; i++) {
    if (arr[i] > 0) break
    if (arr[i] === arr[i - 1]) continue
    const target = -arr[i]
    let left = i + 1, right = length - 1
    while(left < right) {
      const sum = arr[left] + arr[right]
      if (sum === target) {
        ret.push([arr[i], arr[left], arr[right]])
        while(left < right && arr[left] === arr[left + 1]) left++
        while(left < right && arr[right] === arr[right - 1]) right--
        left++
        right--
      } else {
        sum > target ? right-- : left++
      }
    }
  }
  return ret;
}
debugger
const arr = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(arr));
