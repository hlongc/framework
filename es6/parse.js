const obj = {
  a: { b: [1, 2, 3] },
  d: {
    f: 1
  }
}

function parse(obj, str) {
  const fn = new Function('obj', 'return obj.' + str)
  return fn(obj)
}

const r = parse(obj, 'd.f')
const r1 = parse(obj, 'a.b[2]')

console.log(r, r1)