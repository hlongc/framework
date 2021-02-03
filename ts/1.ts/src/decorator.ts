
/**
 * 类的装饰器传入的参数是类的构造函数
 * @param constructor 构造函数
 */
function Override<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    public name = '嘻嘻'
    public age = 25
  }
}

/**
 * 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
 * 
 *  1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 
 *  2.成员的名字。
 * 
 *  3.成员的属性描述符。
 * @param value 
 */
function addPrefix(value: string) {
  return function(prototype: object, key: any, descriptor: PropertyDescriptor) {
    (prototype as any).xixi = value
  }
}

@Override
class Human {
  constructor(public hobby: string) {}

  @addPrefix('hello')
  greet() {
    console.log(this.hobby,(this as any).xixi)
  }
}

const person = new Human('footbal')
console.log(person.hobby)
console.log((person as any).name)
console.log((person as any).age)
person.greet()

export {}