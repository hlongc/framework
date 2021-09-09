
const context = {}

function defineGetter(target, key) {
  context.__defineGetter__(key, function() {
    return this[target][key]
  })
}

// ctx.body 等价于  ctx.response.body
function defineSetter(target, key) {
  context.__defineSetter__(key, function(val) {
    this[target][key] = val
  })
}

// ctx.url 就相当于 ctx.request.url
defineGetter('request', 'url')
defineGetter('request', 'query')
defineGetter('request', 'path')

// 设置/获取body
defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context