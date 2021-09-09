function flat(arr, depth = 1) {
  // [[1,1] [[2],1], [[3, [4]],1]]
  // [[[2],1], [[3, [4]],1]]
  // [[2,0], [[3, [4]],1]]
  // [[[3, [4]],1]]
  // [[3, 0], [[4], 0]]
  
  const result = []
  const stack = [...arr.map(item => ([item, depth]))]
  
  while (stack.length > 0) {
    const [top, depth] = stack.pop()
    if (Array.isArray(top) && depth > 0) {
      stack.push(...top.map(item => ([item, depth - 1])))
    } else {
      result.push(top)
    }
  }
  
  return result.reverse()
}

const arr = [1, [8, 9, 2, 'xixi'], 3, [4, [5, 6, 7]]]

console.log(flat(arr, 5))