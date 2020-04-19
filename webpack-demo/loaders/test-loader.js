function testLoader(source) {
  console.log('test-loader')
  return source
}
testLoader.pitch = function() {
  console.log('test-loader: pitch')
}
module.exports = testLoader