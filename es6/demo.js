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
