

const helper = n => {
  const ret = []
  outer: for (let i = 1; i <= n; i++) {
    if (i % 7 === 0) {
      ret.push(i)
    } else {
      let j = i
      while(j) {
        if (j % 10 === 7) {
          ret.push(i)
          continue outer;
        }
        j = ~~(j / 10)
      }
    }
  }
  return ret
}

// console.log(helper(85))

/**
 * 找出乱序的数组中，比左边数字都大，比右边数字都小的数
 * @param {number[]} arr 
 */
const test = arr => {
  let max = -Infinity, min = Infinity //记录当前位置左侧的最大值，右侧的最小值
  const length = arr.length, maxs = [arr[0]], mins = [arr[length - 1]]
  let left = 1, right = length - 2
  while (left < length && right >= 0) {
    max = Math.max(max, arr[left - 1])
    min = Math.min(min, arr[right + 1])
    maxs.push(max)
    mins.unshift(min)
    left++
    right--
  }
  
  for (let i = 0; i < length; i++) {
    // 遍历比较
    if (arr[i] > maxs[i] && arr[i] < mins[i]) {
      return arr[i]
    }
  }
}

// const list = [3, 8, 6, 5, 7, 10, 11, 14, 12, 34]
const list = [3, 4, 5]

console.log(test(list))

const transform = S => {
  debugger
  let T = ''
  let left = 0, right = S.length - 1
  while (left <= right) {
    if (S[left] > S[right]) {
      T += S[right]
      right--
    } else {
      T += S[left]
      left++
    }
  }
  return T
}

const S = 'AECKAFKCDB'

console.log(transform(S))

var findUnsortedSubarray = function(nums) {
  const n = nums.length;
  let maxn = -Number.MAX_VALUE, right = -1;
  let minn = Number.MAX_VALUE, left = -1;
  for (let i = 0; i < n; i++) {
      if (maxn > nums[i]) {
          right = i;
      } else {
          maxn = nums[i];
      }
      if (minn < nums[n - i - 1]) {
          left = n - i - 1;
      } else {
          minn = nums[n - i - 1];
      }
  }
  return right === -1 ? 0 : right - left + 1;
};
debugger
console.log(findUnsortedSubarray([2,6,4,8,10,9,15]))