const buffer1 = Buffer.alloc(10) // buffer就是内存，长度固定
console.log(buffer1)

const buffer2 = Buffer.from('珠')
console.log(buffer2) // e8 83 a1
// 一个utf8编码的汉字是三个字节

// e8 => 11101000
// 83 => 10000011
// a1 => 10100001
let s = ''
buffer2.forEach(buffer => {
  s += buffer.toString(2) // 十六进制转换为二进制字符串
})
console.log(s)

const binaryArr = []
let i = 1
while (i < 5) {
  const str = s.slice((i - 1) * 6, i * 6)
  console.log(str)
  binaryArr.push(str.padStart(8, '0'))
  i++
}

console.log(binaryArr)

// 把 3 * 8 转换为 4 * 6  但是6位不够8位，在前面补两位高位0 所以转base64会占用内存会变大
// 所以转化后的最大值是 00111111 最小值是 00000000 刚好处于0-63，一共64位

let base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
base64 += 'abcdefghijkmnlopqrstuvwxyz'
base64 += '0123456789+/'
// 一共64位

let res = ''
binaryArr.forEach(item => {
  const index = parseInt(item, 2) // 将八个二进制位转换为10进制
  res += base64[index]
})

console.log(res)

