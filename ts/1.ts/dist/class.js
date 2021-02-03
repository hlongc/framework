"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
}
// 一个类只能继承一个抽象类，但是能实现多个接口
class Duck extends Animal {
    say() {
        console.log(`我是${this.name}`);
    }
    drink() {
        console.log('我是哺乳动物，要喝母乳');
    }
    crawl() {
        console.log('爬行');
    }
}
const duck = new Duck('鸭子');
duck.say();
duck.drink();
duck.crawl();
const count = (price) => price * 0.85;
