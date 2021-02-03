// var entry = {
//   'a.b.c.dd': 'abcdd'
// }

var entry = {
  'a.b.c.dd': 'abcdd',
  'a.b.c.f': 'ffff',
  'a.b.e': 'eeee',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

function transfrom(obj) {
  let res = {}
  Object.entries(obj).forEach(([keys, value]) => {
    keys.split('.').reduce((memo, key, index, arr) => {
      if (!memo[key]) {
        if (index === arr.length - 1) {
          memo[key] = value
        } else {
          return memo[key] = {}
        }
      } else {
        return res
      }
    }, res)
  })
  return res
}

console.log(JSON.stringify(transfrom(entry), null, 2))

// var name = 'Tom';
// (function() {
//     if (typeof name == 'undefined') {
//         var name = 'Jack';
//         console.log('Goodbye ' + name);
//     } else {
//         console.log('Hello ' + name);
//     }
// })();

// console.log(name)

// function print(n){
//   setTimeout(`console.log(n)`, Math.floor(Math.random() * 1000));
// }

// for(var i = 0; i < 100; i++) {
//   print(i);
// }