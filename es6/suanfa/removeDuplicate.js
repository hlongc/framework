
/**
 * 移除数组重复元素到末尾，原地移动
 * @param {number[]} arr 
 */
function removeDuplicate(arr) {
  let slow = 0
  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[slow] !== arr[fast]) {
      arr[++slow] = arr[fast]
    }
  }
  return slow + 1
}

const arr = [1, 2, 2, 2, 3, 3, 3, 4]
console.log(removeDuplicate(arr))
console.log(arr)