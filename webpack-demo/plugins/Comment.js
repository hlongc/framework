class CleanComment {
  apply(compiler) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g
    // emit事件是将编译好的代码发射到指定的stream中触发，在这个钩子执行的时候，我们能从回调函数返回的compilation对象上拿到编译好的stream。
    compiler.hooks.emit.tap('CodeBeautify', compilation => {
      // 访问compilation对象，我们用绑定提供了编译 compilation 引用的emit钩子函数，每一次编译都会拿到新的 compilation 对象。这些 compilation 对象提供了一些钩子函数，来钩入到构建流程的很多步骤中
      const assets = compilation.assets
      Object.keys(assets).forEach(data => {
        if (/.js$/.test(data)) { // 只处理js
          // 调用Object.source() 方法，得到资源的内容
          let content = assets[data].source() // 欲处理的文本
          content = content.replace(reg, function (word) { // 去除注释后的文本
            return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
          });
          // 更新compilation.assets[data]对象
          assets[data] = {
            source() {
              return content
            },
            size() {
              return content.length
            }
          }
        }
      })
    })
  }

}

module.exports = CleanComment