module.exports = {
  configureWebpack: {
    output: {
      library: 'vueApplication',
      libraryTarget: 'umd'
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}