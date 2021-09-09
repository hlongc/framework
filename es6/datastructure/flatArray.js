
function flatArray(arr) {
  const ret = []
  const flat = list => {
    list.forEach(item => {
      if (Array.isArray(item)) {
        flat(item)
      } else {
        ret.push(item)
      }
    })
  }
  flat(arr)
  return ret
}

const list = [1, [2, 3, [4, 5, 6], 0, 12], 55, [90, 100, [{a: 1}]]]
console.log(flatArray(list))