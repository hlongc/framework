/**
 * @param {number[]} values
 * @return {number}
 */
 var maxScoreSightseeingPair = function(values) {
  let ret = 0, prev = values[0]
  for (let i = 1; i < values.length; i++) {
      ret = Math.max(ret, prev + values[i] - i)
      prev = Math.max(prev, values[i] + i)
  }
  return ret
};

debugger
console.log(maxScoreSightseeingPair([8,1,5,2,6]))