const args = process.argv.slice(2);

if (args.includes('--all')) {
  const path = require('path');
  const fs = require('fs');
  const getEntry = entry => {
    let absPath = path.resolve(entry);
    // 读取该文件夹下面的目录
    const files = fs.readdirSync(absPath);
    const fileMap = {};
    files.forEach(file => {
      let p = path.resolve(absPath, file);
      if (fs.statSync(p).isDirectory()) {
        fileMap[file] = path.resolve(p, 'index.js');
      }
    });
    return fileMap;
  };
  // 按需打包，配合babel-import-plugin进行按需加载
  module.exports = {
    outputDir: 'dist',
    configureWebpack: {
      entry: getEntry('./src/package'), // 多入口打包
      output: {
        filename: 'lib/[name]/index.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: ['hu', '[name]']
      },
      externals: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
    css: {
      sourceMap: true,
      extract: {
        filename: 'style/[name]/style.css'
      }
    },
    chainWebpack: config => {
      config.optimization.delete('splitChunks');
      config.plugins.delete('copy');
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      config.plugins.delete('html');
      config.plugins.delete('hmr');
      config.entryPoints.delete('app');
    }
  };
}
