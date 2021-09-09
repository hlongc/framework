const obj = {
  toString() {
    // third
    return 2;
  },
  valueOf() {
    // second
    return 3;
  },
  [Symbol.toPrimitive]() {
    // first
    return 5;
  }
};

// console.log(obj + 1);
// console.log(obj + ' yes');
// console.log(String(obj));

// console.log(Number(obj));
// console.log(parseFloat(obj));
// console.log(parseInt(obj));
// console.log(String(obj));
// console.log(obj.toString());
// console.log(Boolean(obj));

function Animal() {}
const animal = new Animal();

// Function和Object是顶级函数
console.log(animal.__proto__ === Animal.prototype);
console.log(Animal.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Object.__proto__ === Function.prototype);
console.log(Object.prototype.__proto__ === null);
console.log(Animal.prototype.constructor === Animal);
console.log(Function.__proto__ === Function.prototype);

console.log('1234567890 3456'.replace(/\B(?=(\d{3})+\b)/g, ','))

const ret = {}
'<span>你好</span><p>p标签</p>'.replace(/<([a-zA-Z]+)>([\d\D]{0,})<\/\1>/g, function() {
  ret[arguments[1]] = arguments[2]
})
console.log(ret)

console.log('2021-05-16'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$3/$1'))



console.log(parseInt(2222, 2));

[1, 2, 1111].map((a, b) => {
  console.log(parseInt(a, b))
})