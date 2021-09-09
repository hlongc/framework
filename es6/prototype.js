var F = function() {}

Object.prototype.a = function() {
  console.log('a')
}

Function.prototype.b = function() {
  console.log('b')
}

const f = new F()

f.a() // a
f.b() // TypeError: f.b is not a function
// // f.__proto__ = F.prototype
// // f.__proto__.__proto__ = F.prototype.__proto__ = Function.prototype

F.a() // a F => F.__proto__ => Function.prototype => Function.prototype.__proto__ => Object.prototype.a
F.b() // b F => F.__proto__ => Function.prototype.b

// var a = 1;
// function b() {
//   a = 10;
//   console.log(1, a)
//   return;
//   function a() {}
// }
// b();
// console.log(2, a);
