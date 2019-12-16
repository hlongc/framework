function loader1(inputSource) {
  this.cacheable(false)
  return inputSource + '//loader1'
}

module.exports = loader1