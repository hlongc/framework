const { Readable } = require('stream')
const path = require('path')

// 把流转换为字符串
async function readBody(stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      try {
        let ret = ''
        stream.on('data', chunk => {
          ret += chunk
        })
        stream.on('end', () => resolve(ret))
      } catch (e) {
        reject(e)
      }
    })
  } else {
    return stream.toString()
  }
}

// 解析vue相关模块
function resolveVue(root) {
  const compilerPkgPath = path.resolve(root, 'node_modules', '@vue/compiler-sfc/package.json')
  // 引入json文件
  const compilerPkg = require(compilerPkgPath)
  // 获取入口文件路径
  const compilerPath = path.resolve(path.dirname(compilerPkgPath), compilerPkg.main)
  // 获取vue相关包的路径
  const resolvePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)
  // runtime-dom dom运行时
  const runtimeDomPath = resolvePath('runtime-dom')
  // 核心模块
  const runtimeCorePath = resolvePath('runtime-core')
  // reactivity模块
  const reactivityPath = resolvePath('reactivity')
  // shared
  const sharedPath = resolvePath('shared')

  return {
    'vue': runtimeDomPath,
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
    'compiler': compilerPath
  }
}

module.exports = {
  readBody,
  resolveVue
}