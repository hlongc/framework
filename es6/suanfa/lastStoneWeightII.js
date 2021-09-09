

/**
 * @param {number[]} stones
 * @return {number}
 */
 var lastStoneWeightII = function(stones) {
  if (stones.length === 1) return stones[0]
  while(stones.length >= 2) {
      stones.sort((a, b) => a - b)
      const [second, first] = stones.splice(stones.length - 2)
      stones.push(first - second)
  }
  return stones[0]
};


console.log(lastStoneWeightII([31,26,33,21,40]))