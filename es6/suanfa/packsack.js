
/**
 * 01背包问题：容量为maxWeight的背包能放最大价值的物品是多少
 * @param {number[]} weights 
 * @param {number[]} values 
 * @param {number} maxWeight
 * @returns {number}
 */
function packsack(weights, values, maxWeight) {
  const count = weights.length
  // dp[i][j] 表示从下标为[0-i]的物品里任意取，放进容量为j的背包，价值总和最大是多少。
  // 递推公式 dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])第i个物品放与不放两种情况取最大值
  const dp = Array(count).fill(0).map(_ => Array(maxWeight + 1).fill(0))
  // 初始化第一行，也就是第0个物品放到容量为j的背包中的最大价值
  for (let j = 0; j <= maxWeight; j++) {
    if (weights[0] <= j) {
      dp[0][j] = values[0]
    }
  }
  for (let i = 1; i < count; i++) {
    for (let j = 1; j <= maxWeight; j++) {
      if (weights[i] > j) { // 如果当前的重量超过了当前背包的容量，那价值就和i - 1一样
        dp[i][j] = dp[i - 1][j]
      } else { // 没超过就进行计算
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i]] + values[i])
      }
    }
  }
  return dp[count - 1][maxWeight]
}

function packsack(weights, values, maxWeight) {
  // 容量为j的背包最大装的价值是多少
  const dp = Array(maxWeight + 1).fill(0)
  for (let i = 0; i < weights.length; i++) {
    for (let j = maxWeight; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
    }
  }
  return dp[maxWeight]
}

const weights = [1, 3, 4]
const values = [15, 20, 30]
const maxWeight = 4
debugger
console.log(packsack(weights, values, maxWeight))