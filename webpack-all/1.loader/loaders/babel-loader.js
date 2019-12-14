const babel = require('@babel/core')

function loader(inputSource) {
  const options = {
    presets: ['@babel/preset-env'],
    sourceMap: true, // 生成sourcemap文件
    filename: this.resourcePath.split('/').pop() // 给生成的sourceMap加上名字,否则是undefined
  }
  // code:转换后的代码 map:把es6=>es5的映射文件 ast抽象语法树
  const { code, map, ast } = babel.transform(inputSource, options)
  // webpack拿到code以后会转化为ast语法树，找到其中的import语句，进行依赖分析，如果传入了ast语法树，那么会节约转化时间
  return this.callback(null, code, map, ast)
}

module.exports = loader