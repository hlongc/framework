function bubbleSort(arr) {
  const length = arr.length
  for (let i = 0; i < length - 1; i++) {
    let changed = false
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        changed = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (!changed) {
      return arr
    }
  }
  return arr
}


const list = [3, 5, 4, 2, 8, 1, 9, 0]
console.log(bubbleSort(list))