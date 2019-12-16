function imageLoader(inputSource) {
  return inputSource
}
imageLoader.raw = true // webpack默认会把输入的inputSource转换为utf8字符串，raw=true代表使用原生输入，不做转换
module.exports = imageLoader