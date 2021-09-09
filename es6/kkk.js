var jump = function (nums) {
  let farthestPos = 0; // 记录当前能去到的最远的位置，遍历每个点都会求能跳到的最远位置，与它比较，如果把它大就更新它
  let endOfCanReach = 0;
  let steps = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthestPos = Math.max(farthestPos, i + nums[i]);
    if (i === endOfCanReach) {
      endOfCanReach = farthestPos; // 可抵达区间的右端位置
      steps++;
    }
    if (endOfCanReach >= nums.length - 1) {
      // 一旦新的可抵达区间触碰到nums数组的边界，则直接break，不用对区间的点遍历了
      break;
    }
  }
  return steps;
};

debugger;
console.log(jump([2, 3, 1, 1, 4, 1, 2, 4, 5, 3, 1]));
