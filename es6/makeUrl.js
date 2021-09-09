
/**
 * @param {string} currentUrl 
 * @param {string} href 
 */
function genUrl(currentUrl, href) {
  const [protocol, url] = currentUrl.split('://')
  const [origin, ...path] = url.split('/')
  path.pop() // 抛弃最后一个，只需要前面的路径
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }
  if (href.startsWith('/')) {
    return protocol + '://' + origin + href
  }
  if (href.startsWith('./')) {
    return protocol + '://' + origin + '/' + path.join('/') + href.replace('./', '/')
  }
  if (href.startsWith('../')) {
    const tmp = href.split('../')
    while(tmp[0] === '') {
      tmp.shift()
      path.pop()
    }
    return protocol + '://' + origin + '/' + path.join('/') + (path.length ? '/' : '') + tmp.join('/')
  }
  return protocol + '://' + origin + '/' + path.join('/') + (path.length ? '/' : '') + href
}

console.log(genUrl('http://www.baidu.com/a/b/test.html', 'http://www.taobao.com'))
console.log(genUrl('http://www.baidu.com/a/b/test.html', '/demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/test.html', 'demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/test.html', './demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/test.html', '../c/demo.html'))

console.log('---------------------')

console.log(genUrl('http://www.baidu.com/a/b/', 'http://www.taobao.com'))
console.log(genUrl('http://www.baidu.com/a/b/', '/demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/', 'demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/', './demo.html'))
console.log(genUrl('http://www.baidu.com/a/b/', '../c/demo.html'))