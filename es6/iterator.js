const arrayLike = { 0: '1', 1: '2', 2: '3', 3: '4', length: 4 }
// arrayLike[Symbol.iterator] = function() {
//   let i = 0
//   return {
//     next: () => {
//       return { value: this[i], done: i++ === this.length }
//     }
//   }
// }

// arrayLike[Symbol.iterator] = function * () {
//   let i = 0
//   while (i !== this.length) {
//     yield this[i++]
//   }
// }
// console.log([...arrayLike])

console.log(a)
if (true) {
  a = 2;
  function a() { };
  a = 3;
  console.log('内部:', a);
}
console.log('外部:', a)
