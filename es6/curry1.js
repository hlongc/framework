const currying = (fn) => {
  const length = fn.length
  const args = []
  return function next(...arg) {
    args.push(...arg)
    if (args.length >= length) {
      return fn(...args)
    }
    return next
  }
};
const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};
let r = currying(add)(1)(2)(3, 4, 5);
console.log(r);

const after = (times, callback) => {
  return function() {
    times--
    if (!times) {
      callback()
    }
  }
}
const newFn = after(3, () => {
  console.log("ok");
});
newFn()
newFn()
newFn()
