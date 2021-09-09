// const removeDuplicates = nums => {
//   if (nums.length == 0) return 0
//   let i = 0
//   const len = nums.length
//   for (let j = 1; j < len; j++) {
//     if (nums[j] !== nums[i]) {
//       i++
//       nums[i] = nums[j]
//     }
//   }
//   return i + 1
// }

const removeDuplicates = function (nums) {
  let j = 0
  const n = nums.length
  for (let i = 1; i < n; i++) {
    if (nums[i] != nums[i - 1]) {
      nums[++j] = nums[i]
    }
  }
  return j + 1
}


const nums = [1, 1, 1, 1]
removeDuplicates(nums)
console.log(nums)