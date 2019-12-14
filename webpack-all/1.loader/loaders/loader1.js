function loader1(inputSource) {
  this.cacheable(false)
  console.log('我正在转换', inputSource)
  return inputSource + '//loader1'
}

module.exports = loader1