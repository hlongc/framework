// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
//  var search = function(nums, target) {
//   if (!nums.length) return 0
//   let left = 0, right = nums.length - 1
//   while(left < right) {
//       const mid = (left + right) >> 1
//       if (nums[mid] === target) {
//           let l = r = mid
//           while (nums[l] === target || nums[r] === target) {
//               if (nums[l] === target) l--
//               if (nums[r] === target) r++
//           }
//           return r - l - 1
//       } else if (nums[mid] < target) {
//           left++
//       } else {
//           right--
//       }
//   }
//   return 0
// };

// debugger;
// console.log(search([1], 1));

const wordBreak = (s, wordDict) => {
  const len = s.length;
  const wordSet = new Set(wordDict);
  const memo = new Array(len);

  const canBreak = (start) => {
    if (start == len) return true;
    if (memo[start] !== undefined) return memo[start]; // memo中有，就用memo中的

    for (let i = start + 1; i <= len; i++) {
      const prefix = s.slice(start, i);
      if (wordSet.has(prefix) && canBreak(i)) {
        memo[start] = true; // 当前递归的结果存一下
        return true;
      }
    }
    memo[start] = false; // 当前递归的结果存一下
    return false;
  };
  return canBreak(0);
};

console.log(wordBreak("leetcode", ["leet", "code"]));
