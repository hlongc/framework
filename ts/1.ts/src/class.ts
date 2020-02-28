abstract class Animal {
  constructor(public name: string) {}
  abstract say(): void
}

// 接口的成员函数默认是抽象函数，所以不要加关键词abstract
interface Mammal {
  drink(): void
}

interface Crawler {
  crawl(): void
}

// 一个类只能继承一个抽象类，但是能实现多个接口
class Duck extends Animal implements Mammal, Crawler {
  say() {
    console.log(`我是${this.name}`)
  }
  drink() {
    console.log('我是哺乳动物，要喝母乳')
  }
  crawl() {
    console.log('爬行')
  }
}

const duck = new Duck('鸭子')
duck.say()
duck.drink()
duck.crawl()

// 接口还可以约束函数格式
interface Discount{
  (price: number): number
}

const count: Discount = (price: number): number => price * 0.85