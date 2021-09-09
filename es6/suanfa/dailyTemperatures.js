
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  const stack = [], length = temperatures.length, ret = Array(length).fill(0)
  for (let i = 0; i < length; i++) {
      while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
        const index = stack.pop()
        ret[index] = i - index
      }
      stack.push(i)
  }
  return ret
};
// [1,1,4,2,1,1,0,0]
debugger
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))