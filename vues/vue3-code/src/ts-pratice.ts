function Test(name: string, age: number) {
  return { name, age }
}

class Foo {
  constructor(public name: string, public age: number) {}
}

interface Company {
  name: string;
  address: string;
}

interface Person {
  weight: number;
  height: number;
  name: string;
  company: Company;
}

// 约束传入的必须是函数类型，infer写在哪里就是推断什么值，写在返回值就是推断返回值
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer X ? X : never
// 写在参数的位置就是推断参数的类型
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? R : never
// 写在构造函数的位置，推断构造函数传入的参数类型
// { new (...args: any[]): any } 表示可以new的类
type ConstructorParameters<T extends { new (...args: any[]): any }> = T extends { new (...args: infer R): any } ? R : never

type Exclude<T, U> = T extends U ? never : T

type Extract<T, U> = T extends U ? T : never

type Partial<T> = { [K in keyof T]?: T[K] | undefined }
// 深度可选，进行递归  取出类型中的key依次循环
type DeepPartial<T> = {[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]}

type Pick<T, K extends keyof T> = {[R in K]: T[R]}

type Record<K extends keyof any, T> = { [P in K]: T; }

// ------------------------------------------------

type Return = ReturnType<typeof Test>
type Params = Parameters<typeof Test>
type Ex = Exclude<number | string | boolean, boolean>
type Extracts = Extract<number | string | boolean, boolean>

type Con = ConstructorParameters<typeof Foo>

type MyPerson = Partial<Person>
const person: MyPerson = {
  name: 'hlc'
}

const p: DeepPartial<Person> = {
  company: {
    name: 'tencent'
  }
}

const PickPerson: Pick<Person, 'name' | 'height'> = {
  name: '',
  height: 170
}



const obj: Record<string, any> = { name: 'hlc', age: 25 }

// 函数和命名空间可以合并
declare function $(val: string): {
  height(): string;
  width(): string;
}

declare namespace $ {
  namespace fn {
    function extend(): void
  }
}

$('#id').height()
$.fn.extend()

class Animal {
  public name!: string;
}

class Dog extends Animal {
  public age!: number;
}
// TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 
interface RNG {
  [index: number]: Dog,
  [key: string]: Animal;
}

// 函数重载，区别java c++ ，ts多种申明只有一种实现
function createArray(val: string): string[]
function createArray(val: number): number[]
function createArray(val: string | number): string[] | number[] {
  if (typeof val === 'string') {
    return [val]
  } else if (typeof val === 'number') {
    return [val]
  } else {
    return []
  }
}

createArray(1)



export {}