
// 把数组中的0移到末尾
function removeZero(arr) {
  let slow = 0
  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== 0) {
      arr[slow++] = arr[fast]
    }
  }
  for (; slow < arr.length; slow++) {
    arr[slow] = 0
  }
}

const arr = [1, 0, 1, 0, 0, 2, 1]
console.log(removeZero(arr))
console.log(arr)