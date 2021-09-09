/**
 * 
 * @param {number[]} arr
 * @returns {number} 
 */
function lengthOfLIS(arr) {
  let ret = 0
  const dp = Array(arr.length).fill(1)
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    ret = Math.max(ret, dp[i])
  }
  return ret
}


const list = [9, 8, 7, 2, 5, 3, 7, 108, 6]

console.log(lengthOfLIS(list))