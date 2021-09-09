interface A {
  a: number,
  b: number
}

type C = Exclude<'a' | 'c' | 'd', 'a'>

// type D = 

interface Human {
  salary: null | string;
}

const xiaoming: Human = { salary: null }


if (Math.random() > 0.5) {
  xiaoming.salary = '123'
}

const r = typeof xiaoming.salary === 'string' ? test(xiaoming.salary) : null

function test(salary: string | number): void {
  console.log(salary)
}

interface IForm {
  name: string;
  age: number;
}

const form: IForm = {
  name: '',
  age: 16
}

interface IItem {
  prop: keyof IForm
}

const item: IItem = {
  prop: 'age'
}

const a = form[item.prop]
console.log(a)


interface Animal {
  getName: () => string;
  name: string;
}

class Human implements Animal {
  constructor(public name) {}
  getName() {
    return 'xixi'
  }
}