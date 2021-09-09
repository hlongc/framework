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