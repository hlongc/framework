/**
 * @param {number[]} nums
 * @return {string}
 */
 var largestNumber = function(nums) {
  if (nums.length === 1) return nums[0] + ''
  const sort = (a, b) => {
      a += ''
      b += ''
      let index = 0
      while(a[index] && b[index]) {
          const charCodeA = a[index].charCodeAt()
          const charCodeB = b[index].charCodeAt()
          if (charCodeA === charCodeB) {
              index++
          } else if (charCodeA > charCodeB) {
              return 1
          } else {
              return -1
          }
      }
      if (!a[index] && !b[index]) return 0
      // 有一个遍历完了，有一个没遍历完，比如 78 和 7
      if (a[index]) {
          return a[index] > a[index - 1] ? 1 : -1
      } else {
          return b[index] > b[index - 1] ? -1 : 1
      }
  }
  nums.sort(sort)
  console.log(nums)
  // return nums.reverse().join('')
};
debugger
// const nums = [3,30,34,5,9]
const nums = [34323,3432]

console.log(largestNumber(nums))