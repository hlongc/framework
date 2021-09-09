function Parent (name) {
  this.name = name
  this.hobby = ['篮球']
}

Parent.prototype.print = function() {
  console.log(`${this.name} 年龄: ${this.age}, 爱好: ${this.hobby.join('、')}`)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

const prototype = Object.create(Parent.prototype)
prototype.constructor = Child
Child.prototype = prototype

const child1 = new Child('hlongc', 17)
child1.print()

const child2 = new Child('hulongchao', 25)
child2.hobby.push('吃饭')
child2.print()

class Animal {
  constructor(name) {
    this.name = name
  }
}

class Human extends Animal {
  constructor(name, height) {
    super(name)
    this.height = height
  }
}

const person = new Human('人类', 178)
console.log(person)