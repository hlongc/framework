function demoLoader(source) {
  console.log('demo-loader')
  return source
}
demoLoader.pitch = function() {
  console.log('demo-loader: pitch')
}
module.exports = demoLoader