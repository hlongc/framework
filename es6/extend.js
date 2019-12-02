function Animal(name) {
  this.name = name
}
Animal.prototype.say = function () {
  console.log(this.name + '叫~~~')
}

function Tiger(name) {
  Animal.call(this, name)
}
// IE不允许直接操作__proto__，通过下面的方法来修改
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype)
// Tiger.prototype.__proto__ = Animal.prototype

// 第二个参数不传入constuctor的话，会指向Animal
Tiger.prototype = Object.create(Animal.prototype, { constructor: { value: Tiger } })

const tiger = new Tiger('小老虎')
// console.log(tiger.name)
// tiger.say()
// console.log(tiger.constructor)

console.log(Tiger.prototype)