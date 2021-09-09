const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const midIndex = Math.floor(arr.length / 2);
  const left = arr.slice(0, midIndex);
  const right = arr.splice(midIndex, arr.length);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
};

console.log(mergeSort([3, 1, 4, 2, 9, 5, 6])); // [1, 2, 3, 4]
