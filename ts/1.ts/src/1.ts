const names:string = 'hello1'
let age:number = 1234567890
let isMerried:boolean = false
const arr1:Array<string> = ['1', '2']
const arr2:Array<number> = [1, 2, 3]
// 元祖 数量和类型都固定的数组
const person: [string, number] = ['hlongc', 20]

enum Gender { BOY, GIRL }
console.log(Gender.BOY)
function greet(name:string):void {
  console.log(name)
}
greet('hlc')

let demo:string|number = 'hlc'
// 类型断言，但是不能将联合类型断言成不存在的类型
// console.log((demo as number).toFixed(2)) // 联合类型进行类型转换
// console.log((<number>demo).toFixed(2)) // 另外一种类型转换方式

type Self = string | number
const name123:Self = 1234
console.log(name123)

// 类型申明
type getFunction = (x:string, y:string) => string
const getUserName:getFunction = (firstname:string, lastname:string):string => {
  return firstname + lastname
}
console.log(getUserName('hu', 'longchao'))