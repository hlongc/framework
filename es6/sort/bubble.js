function bubbleSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

const list = [3, 5, 4, 2, 8, 1, 9]
bubbleSort(list)
console.log(list)