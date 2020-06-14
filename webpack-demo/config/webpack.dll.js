const DLLPlugin = require('webpack/lib/DllPlugin')
const { resolve, join } = require('./utils.js')

module.exports = {
  mode: 'development',
  entry: {
    // 把开发时不常变动的模块放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    // 输出的文件放在dist目录下面
    path: resolve('../dll'),
    library: '_dll_[name]' // 存放动态链接库的全局变量名称，例如对应的react来说就是_dll_react
  },
  plugins: [
    new DLLPlugin({
      // 动态链接库的全局变量名称，需要和pitput.library中保持一致
      // 该字段的值也就是输出的manifest.json文件中name字段的值
      // 例如 react.manifest.json文件输出时的文件名称
      name: '_dll_[name]',
      // 描述动态链接库的manifest.json-->文件按输出的文件名称
      path: join(resolve('../dll'), '[name].manifest.json')
    })
  ]
}