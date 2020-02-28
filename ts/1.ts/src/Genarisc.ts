function createArray<T>(length: number, val: T): T[] {
  const res: T[] = []
  for (let i = 0; i < length; i++) {
    res[i] = val
  }
  return res
}

const r: Array<string> = createArray<string>(5, 'x') // 泛型在使用时才知道类型，定义函数时不明确
console.log(r)

const root: HTMLElement | null = document.getElementById('root')
const children: HTMLCollection = root!.children
const childNodes: NodeListOf<ChildNode> = root!.childNodes

// 由于使用泛型，所以不能使用某种类型的方法或者属性，可以通过泛型接口进行约定
interface LengthWise {
  length: number
}
function getLen<T extends LengthWise>(val: T) {
  console.log(val.length)
}