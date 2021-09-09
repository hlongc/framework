/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let minLen = Number.MAX_SAFE_INTEGER,
    sum = 0;
  const map = new Map(); // 保存前缀和、索引之间的关系, key是和，value是当前的索引
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (map.get(sum + item - target)) {
      minLen = Math.min(minLen, i - map.get(sum + item - target));
    }
    sum += item;
    map.set(sum, i); // 截止到i时的和
  }
  return minLen === Number.MAX_SAFE_INTEGER ? 0 : minLen;
};

debugger;
console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]));
