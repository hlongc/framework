function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      right = mid
    } else if (arr[mid] < target) {
      left = mid
    }
  }
  return -1
}

const arr = [1, 3, 4, 7, 8, 10, 11]

const ret = binarySearch(arr, 8)
console.log(ret)