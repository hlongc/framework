// 根据下面typeScript代码实现的功能，使用ES5语法实现Animal类和Cat类

class Animal {
    static type = 'Animal';
    private name: string;
    constructor(theName: string) { this.name = theName; }
    public sayName() {
        console.log(`Animal: ${this.name}`);
    }
}

class Cat extends Animal {
    constructor(theName: string) { super(theName); }
    public sayName() {
        super.sayName()
        console.log('Cat');
    }
}

//---- 以下是测试代码，请勿注释 ----//
const kitty = new Cat('kitty')
kitty.sayName(); // 先输出 Animal: kitty，再输出 Cat
console.log(Cat.type) // 输出 Animal

export {}