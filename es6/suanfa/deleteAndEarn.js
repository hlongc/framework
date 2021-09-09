var deleteAndEarn = function(nums) {
  let maxVal = Math.max(...nums);
  const sum = new Array(maxVal + 1).fill(0); // 多一个0，兼容为0的情况
  // [0,0,4,9,4]：索引代表对应的数字，而索引对应的值代表当前数字的和，比如 2个2 的和就是4
  // 由于选了2，3和4都不能选，就转化成了小偷问题，相邻两家只能偷一个，求最大值
  for (const val of nums) {
      sum[val] += val;
  }
  return rob(sum);
};

const rob = (nums) => {
  const size = nums.length;
  let prevMax = nums[0], curMax = Math.max(nums[0], nums[1]);
  for (let i = 2; i < size; i++) {
      let temp = curMax;
      curMax = Math.max(prevMax + nums[i], curMax);
      prevMax = temp;
  }
  return curMax;
}


console.log(deleteAndEarn([3, 4, 2]))

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/delete-and-earn/solution/shan-chu-bing-huo-de-dian-shu-by-leetcod-x1pu/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。