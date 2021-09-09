
function Animal(name) {
    let _name = name
    this.sayName = function() {
        console.log(`my name is ${_name}`)    
    }
}

Animal.prototype.greet = function() {
    console.log('hello')
}

Animal.type = 'Animal'

function Cat(name) {
    Animal.call(this, name)
    const ins = new Animal(name)
    this.sayName = function() {
        ins.sayName.call(this)
        console.log(`Cat`)    
    }
}

Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
// Object.setPrototypeOf(Cat, Animal)
Cat.__proto__ = Animal


const cat = new Cat('miao')
cat.sayName()
console.log(Cat.type)
cat.greet()