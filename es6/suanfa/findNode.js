
// 递归解法
function findNode(tree, id) {
  let ret = '', flag = false
  /**
   * @param {Array} list 
   * @param {Array} tmp 
   */
  const helper = (list, tmp) => {
    if (tmp[tmp.length - 1] === id) {
      flag = true
      ret = tmp.join('->')
      return
    }
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const clone = [...tmp, element.id]
      if (flag) {
        return
      }
      helper(element.children || [], clone)
    }
  }
  helper(tree, [])
  return ret
}

// 栈解法

function findNode(tree, id) {
  const stack = [{ children: tree, id: '' }], ret = []
  let index = 0
  while (stack[index]) {
    const last = stack[index]
    if (last.id === id) {
      let tmp = last
      while (tmp) {
        if (tmp.id !== '') {
          ret.unshift(tmp.id)
        }
        tmp = tmp.parent
      }
      break
    }
    (last.children || []).forEach(child => {
      child.parent = last
      stack.push(child)
    })
    index++
  }
  return ret.join('->')
}


const tree = [
  {
    id: 1,
    children: [
      {
        id: 3,
        children: [
          {
            id: 5
          }
        ]
      }
    ]
  },
  {
    id: 2,
    children: [
      {
        id: 4,
        children: [
          {
            id: 6
          }
        ]
      }
    ]
  },
  {
    id: 3,
    children: [
      {
        id: 5,
        children: [
          {
            id: 9
          }
        ]
      }
    ]
  }
]

console.log(findNode(tree, 9))