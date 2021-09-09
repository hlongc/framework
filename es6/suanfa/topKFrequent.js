/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function(nums, k) {
  const map = {}
  for (const item of nums) {
      if (map[item]) {
          map[item]++
      } else {
          map[item] = 1
      }
  }
  const list = Object.entries(map).sort((a, b) => {
    debugger
    return a[1] > b[1]
  })
  return list.slice(0, k).map(item => item[0])
};

debugger
console.log(topKFrequent([4,1,-1,2,-1,2,3], 2))