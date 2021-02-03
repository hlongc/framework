const obj = {
  a: {
    b: {
      c: 1,
      d: 2,
    },
    e: 3,
  },
  f: {
    g: 4,
    h: {
      i: 5,
    },
  },
  x: 4
};

function formatter(obj) {
  const result = {}
  function handle(target, path = []) {
    for (const key in target) {
      if (typeof target[key] === 'object') {
        handle(target[key], [...path, key])
      } else {
        result[[...path, key].join('.')] = target[key]
      }
    }
  }
  handle(obj)
  return result
}

console.log(formatter(obj))

// const a = [1, 2, 3]
// a.join = a.shift
// console.log(a == 1 && a == 2 && a == 3)

const a = {
  value: 1,
  [Symbol.toPrimitive]() {
    return this.value++
  },
  valueOf() {
    return this.value++
  },
  toString() {
    return this.value++
  }
}

console.log(a == 1 && a == 2 && a == 3)
// console.log(a + 1)
